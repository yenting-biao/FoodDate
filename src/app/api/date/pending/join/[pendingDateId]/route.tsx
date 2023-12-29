import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  datesTable,
  dateParticipantsTable,
  privateMessagesTable,
  usersTable,
  pendingDatesTable,
  pendingDateParticipantsTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      pendingDateId: string;
    };
  }
) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const { pendingDateId } = params;

  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!regex.test(pendingDateId)) {
    NextResponse.json(
      { error: "Invalid pendingDateId" },
      {
        status: 400,
      }
    );
  }

  try {
    const [pendingDate] = await db
      .select({
        remainingSlots: pendingDatesTable.remainingSlots,
      })
      .from(pendingDatesTable)
      .where(eq(pendingDatesTable.pendingDateId, pendingDateId));
    if (!pendingDate)
      return NextResponse.json(
        {
          error: "Pending date not found",
        },
        { status: 404 }
      );
    if (!(pendingDate.remainingSlots > 0))
      return NextResponse.json(
        {
          error: "Date is full",
        },
        { status: 400 }
      );

    const participantIdsRet = await db
      .select({
        participantId: pendingDateParticipantsTable.participantId,
      })
      .from(pendingDateParticipantsTable)
      .where(eq(pendingDateParticipantsTable.pendingDateId, pendingDateId))
      .execute();
    const participantIds = participantIdsRet.map((obj) => obj.participantId);
    if (participantIds.includes(userId))
      return NextResponse.json(
        {
          error: "You have already joined this date",
        },
        { status: 400 }
      );

    await db.insert(pendingDateParticipantsTable).values({
      pendingDateId,
      participantId: userId,
    });

    if (pendingDate.remainingSlots > 1) {
      await db
        .update(pendingDatesTable)
        .set({ remainingSlots: pendingDate.remainingSlots - 1 })
        .where(eq(pendingDatesTable.pendingDateId, pendingDateId));
    } else {
      const [newDate] = await db.insert(datesTable).values({}).returning();
      participantIds.push(userId);
      participantIds.forEach(async (participantId) => {
        await db.insert(dateParticipantsTable).values({
          dateId: newDate.dateId,
          participantId,
        });
      });
      await db
        .delete(pendingDatesTable)
        .where(eq(pendingDatesTable.pendingDateId, pendingDateId));
      // pendingDateParticipants should be deleted by CASCADE trigger
      // TODO: write notifications to participants
    }
    return NextResponse.json({ status: "ok" }, { status: 200 });
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
