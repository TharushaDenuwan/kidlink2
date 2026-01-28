import { z } from "zod";

export const paymentsSchema = z.object({
  id: z.string(),
  childId: z.string(),
  amount: z.string(),
  paymentMethod: z.string(),
  slipUrl: z.string().nullable(),
  status: z.string(),
  paidAt: z.date().nullable(),
  organizationId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const paymentsInsertSchema = z.object({
  childId: z.string(),
  amount: z.string(),
  paymentMethod: z.string(),
  slipUrl: z.string().nullable().optional(),
  status: z.string().optional(),
  paidAt: z.coerce.date().nullable().optional()
});

export const paymentsUpdateSchema = z
  .object({
    amount: z.string().optional(),
    paymentMethod: z.string().optional(),
    slipUrl: z.string().nullable().optional(),
    status: z.string().optional(),
    paidAt: z.coerce.date().nullable().optional()
  })
  .partial();

export type paymentsUpdateType = z.infer<typeof paymentsUpdateSchema>;
export type payments = z.infer<typeof paymentsSchema>;
export type paymentsInsertType = z.infer<typeof paymentsInsertSchema>;
