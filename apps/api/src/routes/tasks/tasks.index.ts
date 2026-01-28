import { createAPIRouter } from "../../lib/setup-api";

import * as handlers from "./tasks.handlers";
import * as routes from "./tasks.routes";

const router = createAPIRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
