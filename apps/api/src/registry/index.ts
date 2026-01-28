import { createAPIRouter } from "@api/lib/setup-api";
import { OpenAPI } from "@api/types";

import { BASE_PATH } from "@api/lib/constants";

import index from "../routes/index.route";

import badges from "../routes/badges/badges.index";
import children from "../routes/children/children.index";
import conversationParticipant from "../routes/conversationParticipants/conversationParticipant.index";
import conversation from "../routes/conversations/conversation.index";
import event from "../routes/event/event.index";
import feedbacks from "../routes/feedbacks/feedback.index";
import gallery from "../routes/gallery/gallery.index";
import hotels from "../routes/hotels/hotel.index";
import lessonPlans from "../routes/lessonPlans/lessonPlans.index";
import media from "../routes/media/media.index";
import messages from "../routes/messages/message.index";
import notification from "../routes/notification/notification.index";
import nurseryClass from "../routes/nursery-class/nursery-class.index";
import nursery from "../routes/nursery/nursery.index";
import organization from "../routes/organization/organization.index";
import parent from "../routes/parents/parent.index";
import payment from "../routes/payments/payments.index";
import propertyClasses from "../routes/property-classes/property-classes.index";
import system from "../routes/system/system.index";
import tasks from "../routes/tasks/tasks.index";
import teacher from "../routes/teachers/teacher.index";
import user from "../routes/user/user.index";


export function registerRoutes(app: OpenAPI) {
const registeredApp = app
  .route("/", index)
  .route("/badges", badges)
  .route("/children", children)
  .route("/conversation-participants", conversationParticipant)
  .route("/conversations", conversation)
  .route("/events", event)
  .route("/feedbacks", feedbacks)
  .route("/gallery", gallery)
  // .route("/hotels", hotels)
  .route("/lesson-plans", lessonPlans)
  .route("/media", media)
  .route("/messages", messages)
  .route("/notifications", notification)
  .route("/nursery-classes", nurseryClass)
  .route("/nurseries", nursery)
  .route("/organizations", organization)
  .route("/parents", parent)
  .route("/payments", payment)
  // .route("/property-classes", propertyClasses)
  .route("/system", system)
  .route("/tasks", tasks)
  .route("/teachers", teacher)
  .route("/users", user);

  return registeredApp;
}

// Standalone router instance and type export for RPC
export const router = registerRoutes(createAPIRouter().basePath(BASE_PATH));

export type Router = typeof router;
