import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./env";

const db = drizzle({
  logger: env.APP_ENV === "development",
  connection: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    ssl: false,
  },
  // schema: [],
});

export default db;
