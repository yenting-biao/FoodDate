import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getLeaderBoard () {
  "use server";
  const res = await db
    .select({
      username: usersTable.username,
      coins: usersTable.coins,
      ranking: usersTable.coins,
    })
    .from(usersTable)
    .orderBy(desc(usersTable.coins), desc(usersTable.username))
    .limit(20);
  return res;
}