import { NextResponse, NextRequest } from "next/server";
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@sendinblue/client";

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            console.error("BREVO_API_KEY is not defined");
            return NextResponse.json({ error: "Server configuration error" });
        }

        const brevoClient = new TransactionalEmailsApi();
        brevoClient.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);

        const emailBody = `
            <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;

        const emailParams = {
            sender: { email: "decoloreslifestyle@gmail.com" },
            to: [{ email: "Chelsycosmeticss@gmail.com" }],
            subject: "User Contacted",
            htmlContent: emailBody,
        };

        const emailResponse = await brevoClient.sendTransacEmail(emailParams);
        return NextResponse.json({ success: true, message: "Form submitted successfully!" }, { status: 200 });
    } catch (error: any) {
        console.error("Error submitting form:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
