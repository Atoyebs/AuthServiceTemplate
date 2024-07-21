import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { success: true, data: {}, message: "successfully hit service/test endpoint" },
    { status: 200 }
  );
}
