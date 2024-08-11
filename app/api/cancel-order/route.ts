import { updateOrder } from "@/server/model/order";
import { findTransaction } from "@/server/model/transaction";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import Razorpay from 'razorpay';

// Initialize Razorpay client with your API key and secret
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(request: NextRequest) {
    try {
        const { awb_code, order } = await request.json();
        const transactionid = order.transactionId.toString();
        // Fetch the transaction details
        const transaction = await findTransaction(transactionid);
        console.log(transaction)
        if (!transaction) {
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }
        
        const shiprocketAuthResponse = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/auth/login",
            {
              email: process.env.SHIPROCKET_EMAIL,
              password: process.env.SHIPROCKET_PASSWORD,
            }
          );
    
        const { token } = shiprocketAuthResponse.data;
        const ids = [order.orderId]
        if (awb_code == null) {
            const response = await axios.post(
                'https://apiv2.shiprocket.in/v1/external/orders/cancel',
                {ids},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            console.log("id:",response)
        }
        else{
            const awbs = [awb_code]
            const response = await axios.post(
                'https://apiv2.shiprocket.in/v1/external/orders/cancel/shipment/awbs',
                {awbs},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            console.log("awb",response)
        }
        // Proceed with refund
        const refund = await razorpay.payments.refund(transaction.razorpayPaymentId, {
            speed: "normal", 
        });
        console.log(refund);
        const updateField = {isCanceled:true}
        await updateOrder(order._id,updateField)
    
        return NextResponse.json({ success: true, refund, });
    } catch (error: any) {
        console.error('Error processing refund:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
