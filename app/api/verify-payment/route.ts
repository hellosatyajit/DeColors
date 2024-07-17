// app/api/verify-payment/route.ts
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import { ITransaction, createTransaction } from "@/server/model/transaction";
import { findUserByEmail } from "@/server/model/User";
import axios from "axios";
import { format } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      cartdetails,
      totalCost,
    } = body;

    console.log(1);

    const secret = process.env.RAZORPAY_SECRET;
    console.log(2);

    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 400 }
      );
    }
    console.log(3);

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");
    console.log(4);

    const user = await findUserByEmail(email);
    const id = user?._id;

    if (digest === razorpaySignature) {
      if (!id) {
        return NextResponse.json(
          { success: false, message: "User not authenticated" },
          { status: 401 }
        );
      }

      const transaction = {
        userId: id,
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        amount: totalCost,
        cart: cartdetails,
        status: "success",
        createdAt: new Date(),
      };
      console.log(5);

      await createTransaction(transaction);

      console.log(6);
      // Shiprocket API credentials
      const shiprocketAuthResponse = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        {
          email: process.env.SHIPROCKET_EMAIL,
          password: process.env.SHIPROCKET_PASSWORD,
        }
      );
      console.log(7);

      const { token } = shiprocketAuthResponse.data;

      console.log(8);

      // Create a shipment
      const createShipmentResponse = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        {
          order_id: orderCreationId,
          order_date: format(new Date(), "yyyy-MM-dd HH:mm"),
          pickup_location: "Primary",
          channel_id: "",
          comment: "Thank you for your purchase!",
          billing_customer_name: user.name,
          billing_last_name: "",
          billing_address: user.address?.address,
          billing_address_2: "",
          billing_city: user.address?.city,
          billing_pincode: user.address?.pinCode,
          billing_state: user.address?.state,
          billing_country: user.address?.country,
          billing_email: user.email,
          billing_phone: user.phoneNumber,
          shipping_is_billing: true,
          shipping_customer_name: user.name,
          shipping_last_name: "",
          shipping_address: user.address?.address,
          shipping_address_2: "",
          shipping_city: user.address?.city,
          shipping_pincode: user.address?.pinCode,
          shipping_country: user.address?.country,
          shipping_state: user.address?.state,
          shipping_email: user.email,
          shipping_phone: user.phoneNumber,
          order_items: cartdetails.map(
            (item: {
              name: any;
              sku: any;
              quantity: any;
              price: { mrp: number; discount: number };
            }) => ({
              name: item.name,
              sku: item.sku,
              units: item.quantity,
              selling_price: (item.price.mrp - item.price.discount).toString(),
              discount: item.price.discount.toString(),
              hsn: 3304,
            })
          ),
          payment_method: "Prepaid",
          shipping_charges: 0,
          giftwrap_charges: 0,
          transaction_charges: 0,
          total_discount: 0,
          sub_total: totalCost,
          length: 10, // Update with dimensions if available
          breadth: 15, // Update with dimensions if available
          height: 20, // Update with dimensions if available
          weight: 2.5, // Update with weight if available
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(9);

      const { shipment_id, awb_number } = createShipmentResponse.data;

      console.log(10);
      // Respond with the success status and Shiprocket tracking URL
      return NextResponse.json(
        {
          success: true,
          message: "Payment successful and shipment created!",
          tracking_url: `https://www.shiprocket.in/shipment-tracking/${awb_number}`,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
