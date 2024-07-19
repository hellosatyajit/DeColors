// pages/api/orders.js
import { NextResponse, NextRequest } from "next/server";
import { findOrdersByUserId } from '@/server/model/order';
import { findUserByEmail } from "@/server/model/User";

export async function POST(request: NextRequest){
  try {
    const { email } = await request.json();
    const user = await findUserByEmail(email);
    if(user?._id){
    const orders = await findOrdersByUserId(user?._id);
    return NextResponse.json({ orders },{status:200});
  }
  else{
    return NextResponse.json({ error: "no user  " },{status:400});
  } 
}catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: "Internal server error" },{status:500});
  }
};
