import { createAPIRouter } from "@api/lib/setup-api";

import * as handlers from "@api/handlers/tasks.handlers";
import * as routes from "@api/routes/tasks.route";

const router = createAPIRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
