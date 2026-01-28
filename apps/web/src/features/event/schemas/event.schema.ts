import { z } from "zod";

// Select schema for reading events from database
export const eventSelectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  ticketPrice: z.string().nullable(),
  venue: z.string().nullable(),
  coverImageUrl: z.string().nullable(),
  galleryImagesUrl: z.string().nullable(),
  status: z.string().nullable(),
  organizer: z.string().nullable(),
  organizationId: z.string().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable()
});
export type EventType = z.infer<typeof eventSelectSchema>;

// Insert schema for creating new events
export const eventInsertSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  ticketPrice: z.string().nullable().optional(),
  venue: z.string().nullable().optional(),
  coverImageUrl: z.string().nullable().optional(),
  galleryImagesUrl: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  organizer: z.string().nullable().optional()
});
export type EventInsertType = z.infer<typeof eventInsertSchema>;

// Update schema for modifying existing events
export const eventUpdateSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional(),
    ticketPrice: z.string().nullable().optional(),
    venue: z.string().nullable().optional(),
    coverImageUrl: z.string().nullable().optional(),
    galleryImagesUrl: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    organizer: z.string().nullable().optional()
  })
  .partial();
export type EventUpdateType = z.infer<typeof eventUpdateSchema>;

// Form schema for frontend forms with validation
export const eventFormSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  ticketPrice: z.string().optional(),
  venue: z.string().optional(),
  coverImageUrl: z.string().optional(),
  galleryImagesUrl: z.string().optional(),
  status: z.enum(["draft", "published", "cancelled"]).optional(),
  organizer: z.string().optional()
});
export type EventFormType = z.infer<typeof eventFormSchema>;
