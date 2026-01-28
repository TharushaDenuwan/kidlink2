import { z } from "zod";

// Select schema for user
export const userSelectSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().url().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.string().nullable(),
  banned: z.boolean().nullable(),
  banReason: z.string().nullable(),
  banExpires: z.date().nullable()
});

// Insert schema (omit auto-generated fields)
export const userInsertSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().url().nullish(),
  role: z.string().nullable().optional(),
  banned: z.boolean().nullable().optional(),
  banReason: z.string().nullable().optional(),
  banExpires: z.date().nullable().optional()
});

// Update schema (partial, omit auto-generated fields)
export const userUpdateSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    emailVerified: z.boolean().optional(),
    image: z.string().url().nullish(),
    role: z.string().nullable().optional(),
    banned: z.boolean().nullable().optional(),
    banReason: z.string().nullable().optional(),
    banExpires: z.date().nullable().optional()
  })
  .partial();

// Types
export type userInsertType = z.infer<typeof userInsertSchema>;
export type userUpdateType = z.infer<typeof userUpdateSchema>;
export type User = z.infer<typeof userSelectSchema>;
