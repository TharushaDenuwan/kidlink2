import { z } from "zod";

// Base select schema
export const classSchema = z.object({
  id: z.string(),
  name: z.string(),
  nurseryId: z.string().nullable(),
  teacherId: z.string().nullable(),
  organizationId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Insert schema
export const classInsertSchema = z.object({
  name: z.string(),
  nurseryId: z.string().nullable().optional(),
  teacherId: z.string().nullable().optional()
});

// Update schema (partial for PATCH)
export const classUpdateSchema = classInsertSchema.partial();

// Types
export type Class = z.infer<typeof classSchema>;
export type ClassInsertType = z.infer<typeof classInsertSchema>;
export type ClassUpdateType = z.infer<typeof classUpdateSchema>;
