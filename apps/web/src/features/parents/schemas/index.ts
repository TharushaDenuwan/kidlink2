import { z } from "zod";

// Select schema for parents
export const parent = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  userId: z.string().nullable(),
  childId: z.array(z.string()).nullable(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string(),
  updatedAt: z.date().nullable(),
  createdAt: z.date().nullable()
});

// Insert schema (omit auto-generated fields)
export const parentInsertSchema = z.object({
  userId: z.string().nullable().optional(),
  childId: z.array(z.string()).nullable().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string()
});

// Update schema (partial, omit auto-generated fields)
export const parentUpdateSchema = z
  .object({
    userId: z.string().nullable().optional(),
    childId: z.array(z.string()).nullable().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional()
  })
  .partial();

// Types
export type parentInsertType = z.infer<typeof parentInsertSchema>;
export type parentUpdateType = z.infer<typeof parentUpdateSchema>;
export type parent = z.infer<typeof parent>;
