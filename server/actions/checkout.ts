"use server";
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

function generateReceipt() {
  const prefix = "order_";
  const timestamp = Date.now(); // Get the current timestamp
  return `${prefix}${timestamp}`;
}

export async function createOrder(amount: number) {
  const receipt = generateReceipt(); // Generate a unique receipt
  return instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt,
    line_items_total: amount * 100
  });
}
export async function fetchOrder(orderId: any){
    return instance.orders.fetch(orderId)
}