import { z } from "zod";

// Select schema for feedbacks
export const feedback = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  childId: z.string().nullable(),
  teacherId: z.string().nullable(),
  content: z.string().nullable(),
  rating: z.string().nullable(),
  images: z.array(z.string()).nullable(),
  teacherFeedback: z.string(),
  reply: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable()
});

// Insert schema (omit auto-generated fields)
export const feedbackInsertSchema = z.object({
  childId: z.string().nullable().optional(),
  teacherId: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  rating: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional(),
  teacherFeedback: z.string(),
  reply: z.string()
});

// Update schema (partial, omit auto-generated fields)
export const feedbackUpdateSchema = z
  .object({
    childId: z.string().nullable().optional(),
    teacherId: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    rating: z.string().nullable().optional(),
    images: z.array(z.string()).nullable().optional(),
    teacherFeedback: z.string().optional(),
    reply: z.string().optional()
  })
  .partial();

// Types
export type feedbackInsertType = z.infer<typeof feedbackInsertSchema>;
export type feedbackUpdateType = z.infer<typeof feedbackUpdateSchema>;
export type feedback = z.infer<typeof feedback>;
