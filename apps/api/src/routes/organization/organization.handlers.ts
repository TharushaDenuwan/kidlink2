import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

//import { db } from "@api/db";

import type { APIRouteHandler } from "@api/types";
import { organizations } from "core/database/schema";

import type {
  CreateRoute,
  GetByIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "./organization.routes";

// 🔍 List all organizations
export const list: APIRouteHandler<ListRoute> = async (c) => {
const db = c.get("db");
  const results = await db.query.organizations.findMany({});
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

// Create new organization
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
  const db = c.get("db");

  const [inserted] = await db
    .insert(organizations)
    .values({
      ...body,
      id: randomUUID(),
      createdAt: new Date(),
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// 🔍 Get a single organization
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
const db = c.get("db");
  const { id } = c.req.valid("param");

  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, String(id)),
  });

  if (!org) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(org, HttpStatusCodes.OK);
};

// Update organization
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const db = c.get("db");

  const [updated] = await db
    .update(organizations)
    .set(updates)
    .where(eq(organizations.id, String(id)))
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

//  Delete organization
export const remove: APIRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");
  const [deleted] = await db
    .delete(organizations)
    .where(eq(organizations.id, String(id)))
    .returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(
    { message: "Organization deleted successfully" },
    HttpStatusCodes.OK
  );
};
