import { NextResponse, NextRequest } from "next/server";
import { updateUser } from "@/server/model/User";

export async function POST(request: NextRequest) {
  try {
    const { email, address, city, country, state, pinCode, phoneNumber, name } = await request.json();

    const updateFields: any = {};

    if (address || city || state || pinCode || country) {
      updateFields.address = {
        address: address || "",
        city: city || "",
        state: state || "",
        pinCode: pinCode || "",
        country: country || ""
      };
    }
    
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (name) updateFields.name = name;

    const result = await updateUser(email, updateFields);

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "User not found or no changes made" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      result
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
