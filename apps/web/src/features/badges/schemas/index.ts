import { z } from "zod";

export const badgesSchema = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  childId: z.string().nullable(),
  teacherId: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.string().nullable(),
  badgeType: z.string().nullable(),
  iconUrl: z.string().nullable(),
  points: z.number().nullable(),
  level: z.string().nullable(),
  awardedAt: z.date().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable()
});

// Insert schema with stricter required types for the form
export const badgesInsertSchema = z.object({
  teacherId: z.string().nullable().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().nullable().optional(),
  badgeType: z.string().min(1, "Badge type is required"),
  iconUrl: z.string().url("Must be a valid URL"),
  points: z.number().nonnegative().default(0),
  level: z.string().min(1, "Level is required")
});

export const badgesUpdateSchema = z
  .object({
    teacherId: z.string().nullable().optional(),
    title: z.string().optional(),
    description: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    badgeType: z.string().nullable().optional(),
    iconUrl: z.string().nullable().optional(),
    points: z.number().nullable().optional(),
    level: z.string().nullable().optional()
  })
  .partial();

export type badgesUpdateType = z.infer<typeof badgesUpdateSchema>;
export type badgesType = z.infer<typeof badgesSchema>;
export type badgesInsertType = z.infer<typeof badgesInsertSchema>;
