import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

//import { db } from "@api/db";

import type { APIRouteHandler } from "../../types";
import { parents } from "core/database/schema";

import type {
  CreateRoute,
  GetByIdRoute,
  GetByUserIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "./parent.routes";

// 🔍 List all parents with filtering by organization ID
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

  // Fetch parents filtered by the current organization ID
  const results = await db.query.parents.findMany({
    where: eq(parents.organizationId, organizationId),
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

// Create new parent
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
    .insert(parents)
    .values({
      ...body,
      organizationId: session.activeOrganizationId,
      userId: session.userId, // Assuming body contains userId
      createdAt: new Date(),
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// 🔍 Get a single parent
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
const db = c.get("db");
  const { id } = c.req.valid("param");

  const parent = await db.query.parents.findFirst({
    where: eq(parents.id, String(id)),
  });

  if (!parent) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(parent, HttpStatusCodes.OK);
};

// Update parent
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const session = c.get("session");
  const db = c.get("db");


  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [updated] = await db
    .update(parents)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(parents.id, String(id)))
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

//  Delete parent
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
    .delete(parents)
    .where(eq(parents.id, String(id)))
    .returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

// 🔍 Get parents by userId
export const getByUserId: APIRouteHandler<GetByUserIdRoute> = async (c) => {
  const { userId } = c.req.valid("param");
  const db = c.get("db");

  // Fetch parents filtered by userId
  const results = await db.query.parents.findMany({
    where: eq(parents.userId, userId),
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
