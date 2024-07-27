// app/api/reset-password/route.ts
import { NextResponse, NextRequest } from "next/server";
import { findUserByEmail, updateUser } from "@/server/model/User";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@sendinblue/client";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const resetToken = crypto.randomBytes(20).toString("hex");
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const resetUrl = `${baseUrl}/forgot-password/${resetToken}`;
    const emailBody = `Please click on this link to reset your password: <a href="${resetUrl}">Reset Password</a>`;

    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await updateUser(email, {
      resetToken: resetToken,
      resetTokenExpiry: new Date(Date.now() + 36000000), // Token expires in 1 hour
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
      to: [{ email }],
      subject: "Reset Your Password",
      htmlContent: emailBody,
    };

    const response = await brevoClient.sendTransacEmail(emailParams);

    if (response.body && response.body.messageId) {
      return NextResponse.json({ message: "Email successfully sent", response });
    } else {
      console.error("Error in Brevo response:", response);
      return NextResponse.json({ error: "Error sending email" });
    }
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Error resetting password" });
  }
}
