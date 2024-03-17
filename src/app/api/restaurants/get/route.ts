import { db } from "@/db";
import { restaurantsTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Assuming the SQL database supports ORDER BY RANDOM() function
    // This is common in SQLite and PostgreSQL, but may differ in other databases
    const randomRestaurant = await db
      .select()
      .from(restaurantsTable)
      .orderBy(sql`RANDOM()`)
      .limit(1)
      .execute();

    if (randomRestaurant.length === 0) {
      return NextResponse.json(
        { message: "No restaurants found in the database." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { restaurant: randomRestaurant[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}