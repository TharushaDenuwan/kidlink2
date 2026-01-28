import { z } from "zod";

export const children = z.object({
  id: z.string(),
  name: z.string(),
  organizationId: z.string().nullable(),
  nurseryId: z.string().nullable(),
  parentId: z.string().nullable(),
  classId: z.string().nullable(),
  badgeId: z.array(z.string()).nullable(),
  dateOfBirth: z.string().nullable(),
  gender: z.string().nullable(),
  emergencyContact: z.string().nullable(),
  medicalNotes: z.string().nullable(),
  profileImageUrl: z.string().nullable(),
  imagesUrl: z.string().nullable(),
  activities: z.string().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable()
});

export const childrenInsertSchema = z.object({
  name: z.string(),
  nurseryId: z.string().nullable().optional(),
  parentId: z.string().nullable().optional(),
  classId: z.string().nullable().optional(),
  badgeId: z.array(z.string()).nullable().optional(),
  dateOfBirth: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  emergencyContact: z.string().nullable().optional(),
  medicalNotes: z.string().nullable().optional(),
  profileImageUrl: z.string().nullable().optional(),
  imagesUrl: z.string().nullable().optional(),
  activities: z.string().nullable().optional()
});

export const childrenUpdateSchema = z
  .object({
    name: z.string().optional(),
    nurseryId: z.string().nullable().optional(),
    parentId: z.string().nullable().optional(),
    classId: z.string().nullable().optional(),
    badgeId: z.array(z.string()).nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    emergencyContact: z.string().nullable().optional(),
    medicalNotes: z.string().nullable().optional(),
    profileImageUrl: z.string().nullable().optional(),
    imagesUrl: z.string().nullable().optional(),
    activities: z.string().nullable().optional()
  })
  .partial();

export type childrenUpdateType = z.infer<typeof childrenUpdateSchema>;
export type children = z.infer<typeof children>;
export type childrenInsertType = z.infer<typeof childrenInsertSchema>;

// Base select schema
export const classSchema = z.object({
  id: z.string(),
  nurseryId: z.string().nullable(),
  organizationId: z.string().nullable(),
  name: z.string(),
  mainTeacherId: z.string().nullable(),
  teacherIds: z.array(z.string()).nullable(),
  childIds: z.array(z.string()).nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable()
});

// Insert schema
export const classInsertSchema = z.object({
  nurseryId: z.string().nullable().optional(),
  name: z.string(),
  mainTeacherId: z.string().nullable().optional(),
  teacherIds: z.array(z.string()).default([]),
  childIds: z.array(z.string()).nullable().optional()
});

// Update schema (partial for PATCH)
export const classUpdateSchema = classInsertSchema.partial();

// Types
export type Class = z.infer<typeof classSchema>;
export type ClassInsertType = z.infer<typeof classInsertSchema>;
export type ClassUpdateType = z.infer<typeof classUpdateSchema>;
