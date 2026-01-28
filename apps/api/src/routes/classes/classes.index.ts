import { createAPIRouter } from "@api/lib/setup-api";

import * as handlers from "./classes.handler";
import * as routes from "./classes.routes";

const router = createAPIRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getById, handlers.getOne)
  .openapi(routes.update, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
