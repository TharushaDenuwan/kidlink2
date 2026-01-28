import { z } from "zod";

export const gallerySelectSchema = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  type: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  images: z.array(z.string()).nullable(),
  childId: z.string().nullable(),
  classId: z.string().nullable(),
  eventId: z.string().nullable(),
  userId: z.string(),
  createdBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const galleryInsertSchema = z.object({
  type: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional(),
  childId: z.string().nullable().optional(),
  classId: z.string().nullable().optional(),
  eventId: z.string().nullable().optional()
});

export const galleryUpdateSchema = z
  .object({
    type: z.string().optional(),
    title: z.string().optional(),
    description: z.string().nullable().optional(),
    images: z.array(z.string()).nullable().optional(),
    childId: z.string().nullable().optional(),
    classId: z.string().nullable().optional(),
    eventId: z.string().nullable().optional()
  })
  .partial();

export type galleryUpdateType = z.infer<typeof galleryUpdateSchema>;
export type galleryType = z.infer<typeof gallerySelectSchema>;
export type galleryInsertType = z.infer<typeof galleryInsertSchema>;
