import { z } from "zod";

export const conversation = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  title: z.string(),
  isGroup: z.boolean().nullable(),
  createdBy: z.string(),
  updatedAt: z.date().nullable(),
  createdAt: z.date().nullable()
});

export const conversationInsertSchema = z.object({
  title: z.string(),
  isGroup: z.boolean().nullable().optional(),
  createdBy: z.string()
});

export const conversationUpdateSchema = z
  .object({
    title: z.string().optional(),
    isGroup: z.boolean().nullable().optional(),
    createdBy: z.string().optional()
  })
  .partial();

export type conversationUpdateType = z.infer<typeof conversationUpdateSchema>;
export type conversation = z.infer<typeof conversation>;
export type conversationInsertType = z.infer<typeof conversationInsertSchema>;
