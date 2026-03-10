import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import UserNewsletter from "@/models/userNewsletter";
import { createTransport } from "nodemailer";
import motivationalEmail from "../../newsletters/motivationalEmail4.js";
import letsTalkSpainEmail from "../../newsletters/letsTalkSpainEmail3.js";
import iSolveProblemsEmail from "../../newsletters/iSolveProblemsEmail5.js";
import welcomingEmail from "../../newsletters/welcomingEmail.js";

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

const emails = [
  {
    subject: "🔴 Welcome to SWA Newsletter.",
    html: welcomingEmail(),
  },
  {
    subject: "🔴 Motivacional email.",
    html: motivationalEmail(),
  },
  {
    subject: "🔴 Lets talk Spain.",
    html: letsTalkSpainEmail(),
  },
  {
    subject: "🔴 I solve problems.",
    html: iSolveProblemsEmail(),
  },
];

const sendEmails = async (email, posicion) => {
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: emails[posicion].subject,
    html: emails[posicion].html,
  });
  console.log(`Correo enviado a ${email} con índice ${posicion}`);
};

export const GET = async (req) => {
  await connectMongoDB();

  const newsletterList = await UserNewsletter.find();
  console.log("counterEmails funcionando");
  for (const user of newsletterList) {
    const email = user.email;
    const doc = await UserNewsletter.findOne({ email });

    if (doc.contador < emails.length) {
      await sendEmails(email, doc.contador);
      doc.contador += 1;
      await doc.save();
    }
  }

  return NextResponse.json("ok");
};
