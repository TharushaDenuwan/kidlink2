import { createAPIRouter } from "../../lib/setup-api";

import * as handlers from "./property-classes.handler";
import * as routes from "./property-classes.routes";

const router = createAPIRouter()
  .openapi(
    routes.listAllPropertyClassesRoute,
    handlers.listPropertyClassesHandler
  )
  .openapi(
    routes.createNewPropertyClassRoute,
    handlers.createPropertyClassHandler
  )
  .openapi(routes.updatePropertyClassRoute, handlers.updatePropertyClassHandler)
  .openapi(
    routes.removePropertyClassRoute,
    handlers.removePropertyClassHandler
  );

export default router;
