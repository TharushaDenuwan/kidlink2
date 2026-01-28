import { and, eq, inArray } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

// //import { db } from "@api/db";

import type { APIRouteHandler } from "@api/types";
import {
  badges,
  childrens,
  classes,
  nurseries,
  parents,
  teachers
} from "core/database/schema";

import type {
  CreateRoute,
  GetByIdRoute,
  GetByParentIdRoute,
  ListRoute,
  ListWithObjectsRoute,
  RemoveRoute,
  UpdateRoute
} from "./children.routes";

// 🔍 List all childrens with optional childId filter
export const list: APIRouteHandler<ListRoute> = async (c) => {
  const session = c.get("session");
  const db = c.get("db");
  const { childId } = c.req.valid("query");

  if (!session?.activeOrganizationId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const organizationId = session.activeOrganizationId;

  // Build where conditions
  const whereConditions = [eq(childrens.organizationId, organizationId)];

  // Add childId filter if provided
  if (childId) {
    whereConditions.push(eq(childrens.id, childId));
  }

  // Fetch children filtered by the current organization ID and optionally by childId
  const results = await db.query.childrens.findMany({
    where:
      whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0]
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
        totalPages
      }
    },
    HttpStatusCodes.OK
  );
};

// Create new children
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const db = c.get("db");

  const body = c.req.valid("json");
  const session = c.get("session");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [inserted] = await db
    .insert(childrens)
    .values({
      ...body,
      organizationId: session.activeOrganizationId,
      createdAt: new Date()
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// 🔍 Get a single children
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
  const db = c.get("db");

  const { id } = c.req.valid("param");

  const children = await db.query.childrens.findFirst({
    where: eq(childrens.id, String(id))
  });

  if (!children) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(children, HttpStatusCodes.OK);
};

// Update children
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const db = c.get("db");

  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const session = c.get("user");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [updated] = await db
    .update(childrens)
    .set({
      ...updates,
      updatedAt: new Date()
    })
    .where(eq(childrens.id, String(id)))
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

//  Delete children
export const remove: APIRouteHandler<RemoveRoute> = async (c) => {
  const db = c.get("db");

  const { id } = c.req.valid("param");
  const session = c.get("user") as { organizationId?: string } | undefined;

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [deleted] = await db
    .delete(childrens)
    .where(eq(childrens.id, String(id)))
    .returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

// 🔍 Get children by parent ID
export const getByParentId: APIRouteHandler<GetByParentIdRoute> = async (c) => {
  const db = c.get("db");

  const { parentId } = c.req.valid("param");

  // Fetch children filtered by parent ID
  const results = await db.query.childrens.findMany({
    where: eq(childrens.parentId, parentId)
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
        totalPages
      }
    },
    HttpStatusCodes.OK
  );
};

// 🔍 List all children with populated objects and optional childId filter
export const listWithObjects: APIRouteHandler<ListWithObjectsRoute> = async (
  c
) => {
  const session = c.get("session");
  const db = c.get("db");
  const { childId } = c.req.valid("query");

  if (!session?.activeOrganizationId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const organizationId = session.activeOrganizationId;

  // Build where conditions
  const whereConditions = [eq(childrens.organizationId, organizationId)];

  // Add childId filter if provided
  if (childId) {
    whereConditions.push(eq(childrens.id, childId));
  }

  // Fetch children filtered by the current organization ID and optionally by childId
  const childrenResults = await db.query.childrens.findMany({
    where:
      whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0]
  });

  // Get unique IDs for bulk fetching
  const nurseryIds = [
    ...new Set(
      childrenResults
        .map((child) => child.nurseryId)
        .filter((id): id is string => id !== null && id !== undefined)
    )
  ];
  const parentIds = [
    ...new Set(
      childrenResults
        .map((child) => child.parentId)
        .filter((id): id is string => id !== null && id !== undefined)
    )
  ];
  const classIds = [
    ...new Set(
      childrenResults
        .map((child) => child.classId)
        .filter((id): id is string => id !== null && id !== undefined)
    )
  ];
  const allBadgeIds = [
    ...new Set(
      childrenResults
        .flatMap((child) => child.badgeId || [])
        .filter((id): id is string => id !== null && id !== undefined)
    )
  ];

  // First fetch classes to get teacherIds, then fetch teachers
  const classesData =
    classIds.length > 0
      ? await db.query.classes.findMany({
          where: inArray(classes.id, classIds)
        })
      : [];

  const teacherIds = [
    ...new Set(
      classesData
        .flatMap((cls) => cls.teacherIds || [])
        .filter((id): id is string => id !== null && id !== undefined)
    )
  ];

  // Bulk fetch related data
  const [nurseriesData, parentsData, badgesData, teachersData] =
    await Promise.all([
      nurseryIds.length > 0
        ? db.query.nurseries.findMany({
            where: inArray(nurseries.id, nurseryIds)
          })
        : [],
      parentIds.length > 0
        ? db.query.parents.findMany({
            where: inArray(parents.id, parentIds)
          })
        : [],
      allBadgeIds.length > 0
        ? db.query.badges.findMany({
            where: inArray(badges.id, allBadgeIds)
          })
        : [],
      teacherIds.length > 0
        ? db.query.teachers.findMany({
            where: inArray(teachers.id, teacherIds)
          })
        : []
    ]);

  // Create lookup maps for better performance
  const nurseryMap = new Map(nurseriesData.map((n) => [n.id, n]));
  const parentMap = new Map(parentsData.map((p) => [p.id, p]));
  const classMap = new Map(classesData.map((c) => [c.id, c]));
  const badgeMap = new Map(badgesData.map((b) => [b.id, b]));
  const teacherMap = new Map(teachersData.map((t) => [t.id, t]));

  // Helper function to safely convert dates to ISO string
  const toISOStringSafe = (date: any): string | null => {
    if (!date) return null;
    if (date instanceof Date) return date.toISOString();
    if (typeof date === "string") {
      const parsed = new Date(date);
      return isNaN(parsed.getTime()) ? null : parsed.toISOString();
    }
    return null;
  };

  // Populate children with objects
  const populatedChildren = childrenResults.map((child) => ({
    id: child.id,
    name: child.name,
    organizationId: child.organizationId,

    // Enhanced nursery object with all available details
    nursery: child.nurseryId
      ? {
          id: child.nurseryId,
          title: nurseryMap.get(child.nurseryId)?.title || "Unknown Nursery",
          address: nurseryMap.get(child.nurseryId)?.address || null,
          phoneNumbers: nurseryMap.get(child.nurseryId)?.phoneNumbers || null,
          organizationId:
            nurseryMap.get(child.nurseryId)?.organizationId || null,
          description: nurseryMap.get(child.nurseryId)?.description || null,
          logo: nurseryMap.get(child.nurseryId)?.logo || null,
          photos: nurseryMap.get(child.nurseryId)?.photos || null,
          longitude: nurseryMap.get(child.nurseryId)?.longitude || null,
          latitude: nurseryMap.get(child.nurseryId)?.latitude || null,
          createdAt: toISOStringSafe(
            nurseryMap.get(child.nurseryId)?.createdAt
          ),
          updatedAt: toISOStringSafe(nurseryMap.get(child.nurseryId)?.updatedAt)
        }
      : null,

    parent: child.parentId
      ? {
          id: child.parentId,
          name: parentMap.get(child.parentId)?.name || "Unknown Parent",
          email: parentMap.get(child.parentId)?.email || "",
          phoneNumber: parentMap.get(child.parentId)?.phoneNumber || "",
          address: parentMap.get(child.parentId)?.address || null,
          createdAt: toISOStringSafe(parentMap.get(child.parentId)?.createdAt),
          updatedAt: toISOStringSafe(parentMap.get(child.parentId)?.updatedAt)
        }
      : null,

    class: child.classId
      ? {
          id: child.classId,
          name: classMap.get(child.classId)?.name || "Unknown Class",
          mainTeacherId: classMap.get(child.classId)?.mainTeacherId || null,
          teacherIds: classMap.get(child.classId)?.teacherIds || null,
          nurseryId: classMap.get(child.classId)?.nurseryId || null,
          createdAt: toISOStringSafe(classMap.get(child.classId)?.createdAt),
          updatedAt: toISOStringSafe(classMap.get(child.classId)?.updatedAt)
        }
      : null,

    badges: (child.badgeId || []).map((badgeId) => {
      const badge = badgeMap.get(badgeId);
      return badge
        ? {
            id: badge.id,
            title: badge.title,
            description: badge.description || null,
            iconUrl: badge.iconUrl || null,
            badgeType: badge.badgeType || null,
            points: badge.points || null,
            level: badge.level || null,
            awardedAt: toISOStringSafe(badge.awardedAt)
          }
        : {
            id: badgeId,
            title: "Unknown Badge",
            description: null,
            iconUrl: null,
            badgeType: null,
            points: null,
            level: null,
            awardedAt: null
          };
    }),

    dateOfBirth: toISOStringSafe(child.dateOfBirth),
    gender: child.gender,
    emergencyContact: child.emergencyContact,
    medicalNotes: child.medicalNotes,
    profileImageUrl: child.profileImageUrl,
    imagesUrl: child.imagesUrl,
    activities: child.activities,
    createdAt: toISOStringSafe(child.createdAt),
    updatedAt: toISOStringSafe(child.updatedAt)
  }));

  const page = 1; // or from query params
  const limit = populatedChildren.length; // or from query params
  const totalCount = populatedChildren.length;
  const totalPages = Math.ceil(totalCount / limit);

  return c.json(
    {
      data: populatedChildren,
      meta: {
        totalCount,
        limit,
        currentPage: page,
        totalPages
      }
    },
    HttpStatusCodes.OK
  );
};
