// app/api/register/route.ts
import { NextResponse, NextRequest } from "next/server";
import { createUser, findUserByEmail } from "@/server/model/User";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    const user = await findUserByEmail(email);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    await createUser(newUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
