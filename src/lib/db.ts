import { Pool, PoolConfig } from "pg";

declare global {
  var _pgPool: Pool | undefined;
}

function getPoolConfig(): PoolConfig {
  const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://admin:q7w8e9a4s5d6z1x2c3%40123@localhost:5432/freshers_db";

  const isSsl =
    process.env.DATABASE_SSL === "true" ||
    connectionString.includes("sslmode=require");

  return {
    connectionString,
    ssl: isSsl ? { rejectUnauthorized: false } : undefined,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  };
}

export function getPool(): Pool {
  if (!global._pgPool) {
    global._pgPool = new Pool(getPoolConfig());
  }
  return global._pgPool;
}

export const pool = new Proxy({} as Pool, {
  get(_target, prop: keyof Pool) {
    const activePool = getPool();
    const value = activePool[prop];
    return typeof value === "function" ? value.bind(activePool) : value;
  },
});

