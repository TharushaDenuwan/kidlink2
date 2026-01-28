import { createAPIRouter } from "@api/lib/setup-api";

import * as handlers from "./notification.handlers";
import * as routes from "./notification.routes";

const router = createAPIRouter()
  .openapi(routes.getByUserId, handlers.getByUserId)

  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getById, handlers.getOne)
  .openapi(routes.update, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
