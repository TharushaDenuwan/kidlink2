import { z } from "zod";

export const conversationParticipant = z.object({
  id: z.string(),
  conversationId: z.string(),
  userId: z.string(),
  role: z.string().nullable(),
  joinedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const conversationParticipantInsertSchema = z.object({
  conversationId: z.string(),
  userId: z.string(),
  role: z.string().nullable().optional(),
  joinedAt: z.date().optional()
});

export const conversationParticipantUpdateSchema = z
  .object({
    conversationId: z.string().optional(),
    userId: z.string().optional(),
    role: z.string().nullable().optional(),
    joinedAt: z.date().optional()
  })
  .partial();

export type conversationParticipantUpdateType = z.infer<
  typeof conversationParticipantUpdateSchema
>;
export type conversationParticipant = z.infer<typeof conversationParticipant>;
export type conversationParticipantInsertType = z.infer<
  typeof conversationParticipantInsertSchema
>;
