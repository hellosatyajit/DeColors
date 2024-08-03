import { findUserByEmail } from "@/server/model/User";
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@sendinblue/client";
import { NextResponse, NextRequest } from "next/server";
import { findOrderByOrderId, updateOrder } from "@/server/model/order";

export async function POST(request: NextRequest) {
    try {
    const body = await request.json();
    const {
        reason,
        otherReason,
        email,
        orderId
    } = body
    const user = await findUserByEmail(email);
    const order = await findOrderByOrderId(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 400 });
    }

    const orderDate = new Date(order.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - orderDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    if (dayDifference > 7) {
      return NextResponse.json({ error: "No return after seven days" }, { status: 400 });
    }
    const updateField = {isReturned:true, reason:reason,otherReason:otherReason || null}
    await updateOrder(order._id,updateField)

        // Prepare email content
    const emailBody = `
        <h1>Return Request Received</h1>
        <p><strong>User:</strong> ${user?.name} (${user?.email})</p>
        <p><strong>User Moblie Number:</strong> ${user?.phoneNumber}</p>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Reason for Return:</strong> ${reason}</p>
        ${otherReason ? `<p><strong>Other Reason:</strong> ${otherReason}</p>` : ''}
        <p><strong>Order Details:</strong></p>
        <ul>
          ${order.cart.map((item: { name: any; sku: any; quantity: any; price: { mrp: any;discount:any; }; }) => `
            <li>
              <strong>Product:</strong> ${item.name} (${item.sku})<br/>
              <strong>Quantity:</strong> ${item.quantity}<br/>
              <strong>Price:</strong> ${item.price.mrp - item.price.discount} ₹<br/>
            </li>
          `).join('')}
        </ul>
      `;
  
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not defined");
      return NextResponse.json({ error: "Server configuration error" });
    }
    const brevoClient = new TransactionalEmailsApi();
    brevoClient.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);
    const emailParams = {
      sender: { email: "decoloreslifestyle@gmail.com" }, 
      to: [{email:"Chelsycosmeticss@gmail.com"}],
      subject: "Return Requested",
      htmlContent: emailBody,
    };
    const response = await brevoClient.sendTransacEmail(emailParams);
    return NextResponse.json(
            {
              success: true,
              message: "Return Request Successfully created!"
            },
            { status: 200 }
          );
} catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
