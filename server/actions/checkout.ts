"use server";
import Razorpay from "razorpay";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!,
  });

export async function createOrder(amount: number, receipt: string = 'order_123456') {
  return instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt,
  });
    
}
