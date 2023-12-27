import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { profileSchema } from "@/validators/profile";
import { eq } from "drizzle-orm";
import type { User } from "@/lib/types/db";

// PUT /api/profile
export async function PUT(req: NextRequest) {
  try {    
    const session = await auth();
    if (!session || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const email = session.user.email;

    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Partial<User>; // TODO: this is temporary
    try {
      validatedReqBody = profileSchema.parse(reqBody);
    } catch (error) {
      console.log("error:", error);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    let toBeUpdated = {};
    if (validatedReqBody.username) {
      toBeUpdated = {
        ...toBeUpdated,
        username: validatedReqBody.username,
      };
    }
    if (validatedReqBody.bio) {
      toBeUpdated = {
        ...toBeUpdated,
        bio: validatedReqBody.bio,
      };
    }
    if (validatedReqBody.avatarUrl) {
      toBeUpdated = {
        ...toBeUpdated,
        avatarUrl: validatedReqBody.avatarUrl,
      };
    }

    if (Object.keys(toBeUpdated).length === 0) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    await db
      .update(usersTable)
      .set(toBeUpdated)
      .where(eq(usersTable.ntuEmail, email));

    return NextResponse.json(      
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}