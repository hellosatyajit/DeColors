// app/api/verify-payment/route.ts
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import { createTransaction } from "@/server/model/transaction";
import { findUserByEmail } from "@/server/model/User";
import axios from "axios";
import { format } from "date-fns";
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@sendinblue/client";
import { createOrder } from "@/server/model/order";
import { getVariantsAndQuantitiesFromPackId, incrementSoldCount } from "@/server/actions/ProductActions";

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
      totalDiscount,
      shippingCharges,
      subTotal,
    } = body;

    const secret = process.env.RAZORPAY_SECRET;

    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 400 }
      );
    }

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    const user = await findUserByEmail(email);
    const id = user?._id.toString();

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
        amount: subTotal,
        discount: totalDiscount,
        cart: cartdetails,
        status: "success",
        createdAt: new Date(),
      };

      const transactionDb = await createTransaction(transaction);
      console.log(transactionDb)
      const trans_id:string = transactionDb?._id.toString()
      // Shiprocket API credentials
      const shiprocketAuthResponse = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        {
          email: process.env.SHIPROCKET_EMAIL,
          password: process.env.SHIPROCKET_PASSWORD,
        }
      );

      const { token } = shiprocketAuthResponse.data;

      const orderItems = await Promise.all(
        cartdetails.map(async (item: any) => {
          if (item.isPack) {
            const variants = await getVariantsAndQuantitiesFromPackId(item.id);
            const variantSkus = variants.map((variant: any) => variant.sku).join(',');
            return {
              name: `${item.brand} ${item.name}`,
              sku: `${item.sku}(${variantSkus})`,
              units: item.quantity,
              selling_price: item.price.mrp.toString(),
              discount: item.price.discount.toString(),
              hsn: 3304,
            };
          } else {
            return {
              name: `${item.brand} ${item.name}`,
              sku: item.sku,
              units: item.quantity,
              selling_price: item.price.mrp.toString(),
              discount: item.price.discount.toString(),
              hsn: 3304,
            };
          }
        })
      );
      

      const createShipmentResponse = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        {
          order_id: orderCreationId,
          order_date: format(new Date(), "yyyy-MM-dd HH:mm"),
          pickup_location: "Primary",
          channel_id: "",
          comment: "Thank you for your purchase!",
          billing_customer_name: user?.name,
          billing_last_name: "",
          billing_address: user?.address?.address,
          billing_address_2: "",
          billing_city: user?.address?.city,
          billing_pincode: user?.address?.pinCode,
          billing_state: user?.address?.state,
          billing_country: user?.address?.country,
          billing_email: user?.email,
          billing_phone: user?.phoneNumber,
          shipping_is_billing: true,
          shipping_customer_name: user?.name,
          shipping_last_name: "",
          shipping_address: user?.address?.address,
          shipping_address_2: "",
          shipping_city: user?.address?.city,
          shipping_pincode: user?.address?.pinCode,
          shipping_country: user?.address?.country,
          shipping_state: user?.address?.state,
          shipping_email: user?.email,
          shipping_phone: user?.phoneNumber,
          order_items: orderItems,
          payment_method: "Prepaid",
          shipping_charges: shippingCharges,
          giftwrap_charges: 0,
          transaction_charges: 0,
          total_discount: totalDiscount,
          sub_total: totalCost,
          length: 10,
          breadth: 15,
          height: 20,
          weight: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { order_id, awb_number: awb_code } = createShipmentResponse.data;
      const order = {
        userId: id,
        orderId: order_id,
        transactionId: trans_id,
        amount: {
          total: subTotal,
          discount: totalDiscount,
          shipping: shippingCharges,
        },
        cart: cartdetails,
        trackingInfo: {
          shipment_id: orderCreationId,
          tracking_url: `https://shiprocket.co/tracking/order/${orderCreationId}?company_id=4008544`,
        },
        createdAt: new Date().toISOString(),
      };

      
      await createOrder(order);
      await incrementSoldCount(cartdetails)


      const emailBody = await generateEmailBody({
        user,
        cartdetails,
        orderId: order_id,
        totalCost,
        totalDiscount,
        shippingCharges,
        subTotal,
      });

      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        console.error("BREVO_API_KEY is not defined");
        return NextResponse.json({ error: "Server configuration error" });
      }
  
      
      const brevoClient = new TransactionalEmailsApi();
      brevoClient.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);
      const emailParams = {
        sender: { email: "santanujuvekar@gmail.com" }, 
        to: [{email:"Chelsycosmeticss@gmail.com"}],
        subject: "New Order",
        htmlContent: emailBody,
      };
      const response = await brevoClient.sendTransacEmail(emailParams);
      return NextResponse.json(
        {
          success: true,
          message: "Payment successful and shipment created!",
          tracking_url: `https://www.shiprocket.in/shipment-tracking/${awb_code}`,
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
async function generateEmailBody({
  user,
  cartdetails,
  orderId,
  totalCost,
  totalDiscount,
  shippingCharges,
  subTotal,
}: {
  user: any;
  cartdetails: any[];
  orderId: string;
  totalCost: number;
  totalDiscount: number;
  shippingCharges: number;
  subTotal: number;
}): Promise<string> {
  let cartItemsHtml = "";

  for (const item of cartdetails) {
    if (item.isPack) {
      const variants = await getVariantsAndQuantitiesFromPackId(item.id);
      const variantDetails = variants
        .map(
          (variant: { sku: any; quantity: any }) =>
            `<li>Name: ${variant.sku}, Quantity: ${variant.quantity}</li>`
        )
        .join("");
      cartItemsHtml += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.price.mrp}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.price.discount}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">
            <ul style="margin: 0; padding: 0 0 0 20px;">
              ${variantDetails}
            </ul>
          </td>
        </tr>
      `;
    } else {
      const variant = item.id.includes('-') ? item.id.split('-').pop() : '';
      cartItemsHtml += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.price.mrp}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.price.discount}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Name: ${variant}, Quantity: 1</td>
        </tr>
      `;
    }
  }

  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Order Confirmation</h2>
      <p>Thank you for your purchase, ${user.name}!</p>
      <p>Order ID: ${orderId}</p>
      <h3>User Information</h3>
      <p>
        Name: ${user.name}<br>
        Email: ${user.email}<br>
        Address: ${user.address?.address}, ${user.address?.city}, ${user.address?.state}, ${user.address?.pinCode}, ${user.address?.country}<br>
        Phone: ${user.phoneNumber}
      </p>
      <h3>Order Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Product</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Discount</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Variants</th>
          </tr>
        </thead>
        <tbody>
          ${cartItemsHtml}
        </tbody>
      </table>
      <h3>Price Details</h3>
      <p>
        SubTotal: ${subTotal}<br>
        Total Discount: ${totalDiscount}<br>
        Shipping Charges: ${shippingCharges}<br>
        Total Cost: ${totalCost}
      </p>
    </div>
  `;
}