import { NextResponse, type NextRequest } from "next/server";

import { eq, and, desc, or, isNull } from "drizzle-orm";

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

// get all pending dates
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const pendingDates = await db
      .select({
        pendingDateId: pendingDatesTable.pendingDateId,
        participantCount: pendingDatesTable.participantCount,
        remainingSlots: pendingDatesTable.remainingSlots,
        time: pendingDatesTable.time,
        restaurantTypes: pendingDatesTable.restaurantTypes,
        participantId: pendingDateParticipantsTable.participantId,
      })
      .from(pendingDatesTable)
      .leftJoin(
        pendingDateParticipantsTable,
        eq(
          pendingDateParticipantsTable.pendingDateId,
          pendingDatesTable.pendingDateId
        )
      )
      .where(
        or(
          eq(pendingDateParticipantsTable.participantId, userId),
          isNull(pendingDateParticipantsTable.participantId)
        )
      )
      .execute();

    const pendingDatesWithParticipationStatus = pendingDates.map(
      (pendingDate) => {
        return {
          pendingDateId: pendingDate.pendingDateId,
          participantCount: pendingDate.participantCount,
          remainingSlots: pendingDate.remainingSlots,
          time: pendingDate.time,
          restaurantTypes: pendingDate.restaurantTypes,
          joined: pendingDate.participantId ? true : false,
        };
      }
    );

    return NextResponse.json(
      {
        pendingDatesWithParticipationStatus,
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
