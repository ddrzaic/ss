import { Pool } from "pg";

export const conn = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});
