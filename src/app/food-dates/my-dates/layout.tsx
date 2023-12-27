import DateList from "./_components/DateList";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import {
  dateParticipantsTable,
  datesTable,
  privateMessagesTable,
  usersTable,
} from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";

export default async function ChatsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL + "/login");
  }
  const userId = session.user.id;
  const chineseNumbers = ["一", "二", "三", "四"];

  const dateIdsRet = await db
    .select({
      dateId: dateParticipantsTable.dateId,
    })
    .from(dateParticipantsTable)
    .where(eq(dateParticipantsTable.participantId, userId))
    .innerJoin(datesTable, eq(dateParticipantsTable.dateId, datesTable.dateId))
    .orderBy(desc(datesTable.occuredAt))
    .execute();

  const dateIds = dateIdsRet.map((obj) => obj.dateId);

  let dates: {
    dateId: string;
    title: string;
    lastMessage: string;
  }[] = [];
  dateIds.forEach(async (dateId) => {
    const participantUsernamesRet = await db
      .select({
        username: usersTable.userId,
      })
      .from(dateParticipantsTable)
      .leftJoin(
        usersTable,
        eq(dateParticipantsTable.participantId, usersTable.userId)
      )
      .where(eq(dateParticipantsTable.dateId, dateId))
      .execute();

    const participantUsernames = participantUsernamesRet.map(
      (obj) => obj.username
    );
    const participantCount = participantUsernames.length;
    let userList = "";
    for (let i = 0; i < participantCount - 1; i++)
      userList += (participantUsernames[i] ?? "[已刪除]") + ", ";
    userList += participantUsernames[participantCount - 1];
    const title = chineseNumbers[participantCount - 1] + "人團：" + userList;

    const [lastMessage] = await db
      .select({
        senderUsername: usersTable.username,
        content: privateMessagesTable.content,
      })
      .from(privateMessagesTable)
      .where(eq(privateMessagesTable.dateId, dateId))
      .leftJoin(
        usersTable,
        eq(usersTable.userId, privateMessagesTable.senderId)
      )
      .orderBy(desc(privateMessagesTable.sentAt))
      .limit(1)
      .execute();

    dates.push({
      dateId,
      title,
      lastMessage:
        (lastMessage.senderUsername ?? "[已刪除]") + ": " + lastMessage.content,
    });
  });

  return (
    <div className="flex flex-row h-full bg-white">
      <DateList dates={dates} />
      {children}
    </div>
  );
}