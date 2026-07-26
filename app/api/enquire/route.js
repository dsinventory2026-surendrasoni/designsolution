import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "dsinventory2026@gmail.com";

// Helper function to send email notification
async function sendNotificationEmail(leadData) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER || process.env.ADMIN_EMAIL;
  const pass = process.env.SMTP_PASS;

  // If password/SMTP credentials aren't provided, log and return early without failing the API
  if (!pass && !process.env.SMTP_USER) {
    console.log("ℹ️ SMTP_PASS not set in environment variables. Email notification skipped, lead saved in MongoDB.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
        <div style="text-align: center; border-b: 2px solid #C9A96E; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0b1629; margin: 0; font-size: 22px;">🏢 DS Group — New Lead Enquiry</h2>
          <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Received from website enquiry form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; width: 35%;">Client Name:</td>
            <td style="padding: 10px; color: #0f172a; font-weight: 600;">${leadData.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Mobile Number:</td>
            <td style="padding: 10px; color: #059669; font-weight: 600;">${leadData.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 10px; color: #2563eb;">${leadData.email || "N/A"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Category Interest:</td>
            <td style="padding: 10px; color: #d97706; font-weight: 600;">${leadData.category}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Budget Range:</td>
            <td style="padding: 10px; color: #7c3aed; font-weight: 600;">${leadData.budget}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Message / Requirements:</td>
            <td style="padding: 10px; color: #334155;">${leadData.message || "No additional note provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #475569;">Submission Date:</td>
            <td style="padding: 10px; color: #64748b;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
          <a href="https://wa.me/${leadData.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; background-color: #10b981; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">
            💬 Connect on WhatsApp
          </a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"DS Group Website" <${user || ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: leadData.email ? leadData.email : undefined,
      subject: `🚨 New Enquiry from ${leadData.name} (${leadData.category} - ${leadData.budget})`,
      html: emailHtml,
    });

    console.log(`✅ Email successfully dispatched to ${ADMIN_EMAIL}`);
    return true;
  } catch (err) {
    console.error("❌ Failed to send email via SMTP:", err.message);
    return false;
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, phone, email, category, budget, message, source } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and Mobile Number are required." },
        { status: 400 }
      );
    }

    const leadData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "",
      category: category || "Residential",
      budget: budget || "Not Specified",
      message: message ? message.trim() : "",
      source: source || "Website Enquire Form",
    };

    // Save lead into MongoDB
    const newLead = await Lead.create(leadData);

    // Forward email notification asynchronously
    sendNotificationEmail(leadData).catch((e) =>
      console.error("Async email error:", e)
    );

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully!",
        data: newLead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
