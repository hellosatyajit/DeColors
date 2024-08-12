import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();
    const shiprocketAuthResponse = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );

    const { token } = shiprocketAuthResponse.data;
    const response = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/orders/show/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { shipments } = response.data.data;
    return NextResponse.json({ status: shipments.status }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
