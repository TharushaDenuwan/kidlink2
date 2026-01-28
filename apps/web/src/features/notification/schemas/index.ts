import { z } from "zod";

export const notification = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  senderId: z.string(),
  receiverId: z.array(z.string()),
  topic: z.string(),
  description: z.string(),
  status: z.enum(["event", "parents meeting", "found colection", "others"]),
  updatedAt: z.date().nullable(),
  createdAt: z.date().nullable()
});

export const notificationInsertSchema = z.object({
  senderId: z.string(),
  receiverId: z.array(z.string()),
  topic: z.string(),
  description: z.string(),
  status: z
    .enum(["event", "parents meeting", "found colection", "others"])
    .optional()
});

export const notificationUpdateSchema = z
  .object({
    senderId: z.string().optional(),
    receiverId: z.array(z.string()).optional(),
    topic: z.string().optional(),
    description: z.string().optional(),
    status: z
      .enum(["event", "parents meeting", "found colection", "others"])
      .optional()
  })
  .partial();

export type notificationUpdateType = z.infer<typeof notificationUpdateSchema>;
export type notification = z.infer<typeof notification>;
export type notificationInsertType = z.infer<typeof notificationInsertSchema>;
