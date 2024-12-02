import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { generateUUID } from "../lib/uuid";
import { roleEnum } from "./enum.schema";

const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateUUID()),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum().default("user").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export default usersTable;
