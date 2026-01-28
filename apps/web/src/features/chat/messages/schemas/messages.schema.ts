import { z } from "zod";

export const message = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  content: z.string().nullable(),
  attachmentUrl: z.string().nullable(),
  isRead: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const messageInsertSchema = z.object({
  conversationId: z.string(),
  senderId: z.string(),
  content: z.string().nullable().optional(),
  attachmentUrl: z.string().nullable().optional(),
  isRead: z.boolean().optional()
});

export const messageUpdateSchema = z
  .object({
    conversationId: z.string().optional(),
    senderId: z.string().optional(),
    content: z.string().nullable().optional(),
    attachmentUrl: z.string().nullable().optional(),
    isRead: z.boolean().optional()
  })
  .partial();

export type messageUpdateType = z.infer<typeof messageUpdateSchema>;
export type message = z.infer<typeof message>;
export type messageInsertType = z.infer<typeof messageInsertSchema>;
