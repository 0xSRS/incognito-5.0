import { Pool } from "pg";

declare global {
  var _pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

export const pool =
  global._pgPool ||
  new Pool({
    connectionString: connectionString || undefined,
    ssl:
      process.env.DATABASE_SSL === "true" ||
      (connectionString && connectionString.includes("sslmode=require"))
        ? { rejectUnauthorized: false }
        : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  global._pgPool = pool;
}
