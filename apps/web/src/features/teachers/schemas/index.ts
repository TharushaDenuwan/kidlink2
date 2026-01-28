import { z } from "zod";

// Select schema for teachers
export const teacher = z.object({
  id: z.string(),
  classId: z.string().nullable(),
  organizationId: z.string().nullable(),
  userId: z.string().nullable(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string(),
  updatedAt: z.date().nullable(),
  createdAt: z.date().nullable()
});

// Insert schema (omit auto-generated fields)
export const teacherInsertSchema = z.object({
  classId: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string()
});

// Update schema (partial, omit auto-generated fields)
export const teacherUpdateSchema = z
  .object({
    classId: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional()
  })
  .partial();

// Types
export type teacherInsertType = z.infer<typeof teacherInsertSchema>;
export type teacherUpdateType = z.infer<typeof teacherUpdateSchema>;
export type teacher = z.infer<typeof teacher>;
