// user.handlers.ts
import { eq, sql } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

//import { db } from "@api/db";

import type { APIRouteHandler } from "../../types";
import { users } from "core/database/schema";

import type {
  CountRoute,
  GetByIdRoute,
  ListRoute,
  UpdateUserRoute,
} from "./user.routes";

// List all users
export const list: APIRouteHandler<ListRoute> = async (c) => {
const db = c.get("db");
  const results = await db.query.users.findMany();

  // Simple meta scaffold; wire real pagination later
  const page = 1;
  const limit = results.length || 1;
  const totalCount = results.length;
  const totalPages = Math.ceil(totalCount / Math.max(limit, 1));

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

// Get user by ID
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
const db = c.get("db");
  const { id } = c.req.valid("param");
  const userRow = await db.query.users.findFirst({
    where: eq(users.id, String(id)),
  });
  if (!userRow) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }
  return c.json(userRow, HttpStatusCodes.OK);
};

// Get total user count
export const count: APIRouteHandler<CountRoute> = async (c) => {
  const db = c.get("db");
  // drizzle-orm count(*)
  const [{ count } = { count: 0 }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);

  return c.json({ count: Number(count ?? 0) }, HttpStatusCodes.OK);
};

// Update user by ID
export const updateUser: APIRouteHandler<UpdateUserRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updateData = c.req.valid("body");
  const db = c.get("db");

  const updatedUser = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, String(id)))
    .returning();

  if (!updatedUser.length) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updatedUser[0], HttpStatusCodes.OK);
};
