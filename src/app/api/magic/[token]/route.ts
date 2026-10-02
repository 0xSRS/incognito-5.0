import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import crypto from "crypto";

const BACKEND_URL = process.env.BACKEND_URL || "https://flags.incognito05.tech";

function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "classified@incognito.sec";
  const [name, domain] = email.split("@");
  if (name.length <= 2) {
    return `${name[0]}*@${domain}`;
  }
  return `${name[0]}***${name[name.length - 1]}@${domain}`;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;

  if (!token || token.trim().length === 0) {
    return NextResponse.json(
      { status: "error", message: "Missing token parameter." },
      { status: 400 }
    );
  }

  const cleanToken = token.trim();
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  // 1. Try querying the FastAPI backend on the VM first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const backendRes = await fetch(`${BACKEND_URL}/magic/${encodeURIComponent(cleanToken)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": clientIp,
        "X-Real-IP": clientIp,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        },
      });
    }

    if (backendRes.status === 404) {
      return NextResponse.json(
        {
          status: "error",
          message: "Dossier not found or burned. Invalid magic link.",
        },
        { status: 404 }
      );
    }
  } catch {
    // Backend VM might be on private network or starting up; proceed to direct DB fallback
  }

  // 2. Fallback directly to PostgreSQL via connection pool
  try {
    const tokenHash = crypto.createHash("sha256").update(cleanToken).digest("hex");

    const query = `
      SELECT u.user_id,
             u.name,
             u.email,
             ug.magic_link,
             COALESCE(ug.encoding, p.encoding_type, 'base64') AS encoding,
             p.encoded_str,
             p.encoding_type,
             COALESCE(uf.is_used, FALSE) AS is_used,
             uf.flag_hash
        FROM user_gets ug
        JOIN users u ON u.user_id = ug.user_id
        LEFT JOIN user_flags uf ON uf.user_id = u.user_id
        LEFT JOIN pastes p ON p.flag_id = uf.flag_id
       WHERE ug.magic_link = $1 OR ug.magic_link_hash = $2
       LIMIT 1;
    `;

    const result = await pool.query(query, [cleanToken, tokenHash]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Dossier not found or burned. Invalid magic link.",
        },
        { status: 404 }
      );
    }

    const row = result.rows[0];
    const resolvedEncoding = (row.encoding || row.encoding_type || "base64").toLowerCase();

    return NextResponse.json(
      {
        status: "success",
        user_id: row.user_id,
        name: row.name,
        masked_email: maskEmail(row.email),
        encoding: resolvedEncoding,
        encoded_str: row.encoded_str || "",
        flag_hash: row.flag_hash || "",
        is_claimed: Boolean(row.is_used),
        case_file: `INC-05-UF-${String(row.user_id).padStart(4, "0")}`,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        },
      }
    );
  } catch (dbError: unknown) {
    const err = dbError as Error;
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to resolve dossier. Please try again later.",
        detail: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
