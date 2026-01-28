import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

//import { db } from "@api/db";

import type { APIRouteHandler } from "../../types";
import { teachers } from "core/database/schema";

import type {
  CreateRoute,
  GetByIdRoute,
  GetByUserIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "./teacher.routes";

// 🔍 List all teachers with filtering by organization ID
export const list: APIRouteHandler<ListRoute> = async (c) => {
const db = c.get("db");
 const session = c.get("session");

  if (!session?.activeOrganizationId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const organizationId = session.activeOrganizationId;

  // Fetch teachers filtered by the current organization ID
  const results = await db.query.teachers.findMany({
    where: eq(teachers.organizationId, organizationId),
  });

  const page = 1; // or from query params
  const limit = results.length; // or from query params
  const totalCount = results.length;
  const totalPages = Math.ceil(totalCount / limit);

  return c.json(
    {
      data: results,
      meta: {
        totalCount,
        limit,
        currentPage: page,
        totalPages,
      },
    },
    HttpStatusCodes.OK
  );
};

// Create new teacher
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
 const session = c.get("session");
const db = c.get("db");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [inserted] = await db
    .insert(teachers)
    .values({
      ...body,
      organizationId: session.activeOrganizationId,
      userId: session.userId,
      createdAt: new Date(),
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// 🔍 Get a single teacher
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
const db = c.get("db");
  const { id } = c.req.valid("param");

  const teacher = await db.query.teachers.findFirst({
    where: eq(teachers.id, String(id)),
  });

  if (!teacher) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(teacher, HttpStatusCodes.OK);
};

// Update teacher
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const session = c.get("user");
  const db = c.get("db");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [updated] = await db
    .update(teachers)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(teachers.id, String(id)))
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

//  Delete teacher
export const remove: APIRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const session = c.get("user") as { organizationId?: string } | undefined;
  const db = c.get("db");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [deleted] = await db
    .delete(teachers)
    .where(eq(teachers.id, String(id)))
    .returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

// 🔍 Get teachers by userId
export const getByUserId: APIRouteHandler<GetByUserIdRoute> = async (c) => {
  const { userId } = c.req.valid("param");
  const db = c.get("db");

  // Fetch teachers filtered by userId
  const results = await db.query.teachers.findMany({
    where: eq(teachers.userId, userId),
  });

  // if (results.length === 0) {
  //   return c.json(
  //     { message: HttpStatusPhrases.NOT_FOUND },
  //     HttpStatusCodes.NOT_FOUND
  //   );
  // }

  const page = 1; // or from query params
  const limit = results.length; // or from query params
  const totalCount = results.length;
  const totalPages = Math.ceil(totalCount / limit);

  return c.json(
    {
      data: results,
      meta: {
        totalCount,
        limit,
        currentPage: page,
        totalPages,
      },
    },
    HttpStatusCodes.OK
  );
};
