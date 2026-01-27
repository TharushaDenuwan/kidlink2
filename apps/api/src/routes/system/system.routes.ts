import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { errorMessageSchema } from "core/zod";
import { checkUserTypeSchema } from "./system.schema";
import { authMiddleware } from "@/middlewares/auth.middleware"


const tags: string[] = ["System"];

// List route definition
export const checkUserType = createRoute({
  tags,
  summary: "Check user type",
  path: "/check-user-type",
  method: "get",
  middleware: [authMiddleware],

  responses: {
    [HttpStatusCodes.OK]: jsonContent(checkUserTypeSchema, "The user type"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    )
  }
});

export type CheckUserTypeRoute = typeof checkUserType;
