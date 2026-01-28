import { z } from "zod";

// Convert createdAt, updatedAt to String from Date
export const selectTaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  done: z.boolean(),
  createdAt: z.date().transform((date) => date && date.toISOString()),
  updatedAt: z
    .date()
    .transform((date) => date && date.toISOString())
    .nullable()
});

export const addTaskSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  done: z.boolean()
});

export const updateTaskSchema = addTaskSchema.partial();

export type Task = z.infer<typeof selectTaskSchema>;

export type AddTaskSchema = z.infer<typeof addTaskSchema>;

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
