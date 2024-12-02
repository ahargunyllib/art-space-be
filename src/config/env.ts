import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z
    .enum(["development", "production", "test", "staging"])
    .default("development"),
  APP_PORT: z.string().default("8080"),

  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.string().default("5432"),
  DB_USER: z.string().default("postgres"),
  DB_PASSWORD: z.string().default("postgres"),
  DB_NAME: z.string().default("art_space_be"),
});

export const env = envSchema.parse(Bun.env);
