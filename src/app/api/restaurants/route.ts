import { getRestaurants } from '@/app/restaurants/_components/actions';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const restaurants = await getRestaurants();
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', {status: 500});
  }
}