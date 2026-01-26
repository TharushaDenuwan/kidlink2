import { createAPIRouter } from "@/lib/setup-api";

import * as handlers from "./system.handlers";
import * as routes from "./system.routes";

const router = createAPIRouter().openapi(
  routes.checkUserType,
  handlers.checkUserTypeHandler
);

export default router;
