import { db } from "@/db";
import { missionListsTable } from "@/db/schema";
import { and, asc, gte, lte } from "drizzle-orm";

export async function getInProgressMission() {
  "use server";

  const res = await db
    .select({
      missionId: missionListsTable.missionId,
      missionName: missionListsTable.missionName,
      missionDescription: missionListsTable.missionDescription,
      relatedPlaceId: missionListsTable.relatedPlaceId,
      prize: missionListsTable.prize,
      startAt: missionListsTable.startAt,
      endAt: missionListsTable.endAt,
    })
    .from(missionListsTable)
    .where(and(lte(missionListsTable.startAt, new Date()), gte(missionListsTable.endAt, new Date())))
    .orderBy(asc(missionListsTable.endAt), asc(missionListsTable.startAt))
    .execute();
  return res;
}