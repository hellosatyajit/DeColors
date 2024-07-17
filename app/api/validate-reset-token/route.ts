// app/api/validate-reset-token/route.ts
import { NextResponse, NextRequest } from "next/server";
import { findUserByResetToken } from "@/server/model/User";

export async function POST(request: NextRequest) {
  try {
    const { resetToken } = await request.json();
    const user = await findUserByResetToken(resetToken);

    if (!user) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ valid: false, error: "Error validating token" }, { status: 500 });
  }
}
