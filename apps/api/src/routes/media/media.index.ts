import { createAPIRouter } from "../../lib/setup-api";

import * as handlers from "./media.handler";
import * as routes from "./media.routes";

const router = createAPIRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.getById, handlers.getById)
  .openapi(routes.create, handlers.create)
  .openapi(routes.update, handlers.update)
  .openapi(routes.remove, handlers.remove);

export default router;
