import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { generateUUID } from "../lib/uuid";
import usersTable from "./user.schema";

const sessionsTable = pgTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

export default sessionsTable;
