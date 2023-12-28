import { NextResponse, type NextRequest } from "next/server";

import { eq, and, desc } from "drizzle-orm";

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

type createPendingDatePayload = {
  participantCount: number;
  time: string;
  restaurantTypes: string;
};

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const { participantCount, time, restaurantTypes }: createPendingDatePayload =
    await req.json();
  try {
    const [newPendingDate] = await db
      .insert(pendingDatesTable)
      .values({
        participantCount,
        remainingSlots: participantCount - 1,
        time,
        restaurantTypes,
      })
      .returning();

    return NextResponse.json(
      { pendingDateId: newPendingDate.pendingDateId },
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
