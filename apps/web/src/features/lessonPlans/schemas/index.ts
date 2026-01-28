import { z } from "zod";

export const lessonPlan = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  title: z.string(),
  content: z.string().nullable(),
  teacherId: z.string().nullable(),
  childId: z.string().nullable(),
  classId: z.string().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable()
});

export const lessonPlanInsertSchema = z.object({
  title: z.string(),
  content: z.string().nullable().optional()
});

export const lessonPlanUpdateSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().nullable().optional()
  })
  .partial();

export type lessonPlanUpdateType = z.infer<typeof lessonPlanUpdateSchema>;
export type lessonPlan = z.infer<typeof lessonPlan>;
export type lessonPlanInsertType = z.infer<typeof lessonPlanInsertSchema>;
