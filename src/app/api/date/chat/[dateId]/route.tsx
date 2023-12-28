import { NextResponse, type NextRequest } from "next/server";

import { eq, and, desc } from "drizzle-orm";

import { db } from "@/db";
import {
  datesTable,
  dateParticipantsTable,
  privateMessagesTable,
  usersTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      dateId: string;
    };
  }
) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const { dateId } = params;
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!regex.test(dateId)) {
    NextResponse.json(
      { error: "Invalid dateId" },
      {
        status: 400,
      }
    );
  }

  try {
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

    if (!participantUsernamesRet.length) {
      return NextResponse.json(
        {
          error: "Date not found",
        },
        { status: 404 }
      );
    }

    const participantUsernames = participantUsernamesRet.map(
      (obj) => obj.username
    );

    const messages = await db
      .select({
        messageId: privateMessagesTable.messageId,
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
      .execute();

    return NextResponse.json(
      {
        participantUsernames,
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      dateId: string;
    };
  }
) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const { dateId } = params;
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!regex.test(dateId)) {
    NextResponse.json(
      { error: "Invalid dateId" },
      {
        status: 400,
      }
    );
  }

  const [exist] = await db
    .select({
      id: dateParticipantsTable.participantId,
    })
    .from(dateParticipantsTable)
    .where(
      and(
        eq(dateParticipantsTable.dateId, dateId),
        eq(dateParticipantsTable.participantId, userId)
      )
    )
    .execute();

  if (!exist) {
    return NextResponse.json(
      {
        error: "Date not found",
      },
      { status: 404 }
    );
  }

  const [user] = await db
    .select({
      username: usersTable.username,
    })
    .from(usersTable)
    .where(eq(usersTable.userId, userId))
    .execute();

  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 404 }
    );
  }

  const data: { content: string } = await req.json();
  const { content } = data;
  try {
    const [newMessage] = await db
      .insert(privateMessagesTable)
      .values({ dateId, senderId: userId, content })
      .returning();

    return NextResponse.json(
      { messageId: newMessage.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
