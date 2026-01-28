import { z } from "zod";

export const queryParamsSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.string().optional()
});

export type QueryParamsSchema = z.infer<typeof queryParamsSchema>;

export const mediaTypeSchema = z.enum(["image", "video", "audio", "document"]);

export type MediaType = z.infer<typeof mediaTypeSchema>;

export const mediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  type: mediaTypeSchema,
  filename: z.string(),
  size: z.number(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Media = z.infer<typeof mediaSchema>;

export interface Progress {
  loaded: number;
  total: number;
  percentage: number;
  key: string;
}

export interface UploadParams {
  file: File;
  type?: MediaType;
  path?: string;

  onProgress: (progress: Progress) => void;
}

export const mediaUploadSchema = z.object({
  url: z.string(),
  type: mediaTypeSchema,
  filename: z.string(),
  size: z.number()
});

export type MediaUploadType = z.infer<typeof mediaUploadSchema>;

export const mediaUpdateSchema = z
  .object({
    url: z.string().optional(),
    filename: z.string().optional(),
    size: z.number().optional(),
    updatedAt: z.date().optional()
  })
  .partial();

export type MediaUpdateType = z.infer<typeof mediaUpdateSchema>;

const PROJECT_FOLDER = "bloonsoo";

export enum MediaUploadPaths {
  GALLERY = `${PROJECT_FOLDER}/gallery`
}
