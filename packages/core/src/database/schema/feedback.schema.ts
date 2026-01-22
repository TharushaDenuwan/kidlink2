import { sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizations, users } from "./auth.schema";
import { childrens } from "./children.schema";

export const feedbacks = pgTable("feedback", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  organizationId: text("organization_id").references(() => organizations.id),

  // childrens.id is serial (integer)
  childId: text("child_id").references(() => childrens.id),

  // user.id is text in your auth schema; use text here (change to integer if your users table uses int IDs)
  teacherId: text("teacher_id").references(() => users.id),

  content: text("content"),

  // store multiple image URLs/paths; Postgres text[]
  rating: text("rating"),
  images: text("images").array(),
  teacherFeedback: text("teacher_feedback").notNull(),
  reply: text("reply").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
