import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
// import UserNewsletter from "@/models/userNewsletter";
import { createTransport } from "nodemailer";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  ignoreTLS: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Ignora certificados no confiables
  },
});

export const POST = async (req) => {
  const { subject, html } = await req.json();
  console.log(subject, html);
  await connectMongoDB();
  try {
    // const newsletterList = await UserNewsletter.find();
    const emailAlex = ["blackbookopen@gmail.com"];

    // const newsletterEmailList = newsletterList.map((user) => user.email);
    //para hacer una pruebla con solo mi email, comenta la linea anterior y descomenta la siguiente
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      bcc: [emailAlex],
      subject: subject,
      html: html,
    });
    return NextResponse.json({ message: "emails enviados" }, { status: 201 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("could not send emails");
  }
};
