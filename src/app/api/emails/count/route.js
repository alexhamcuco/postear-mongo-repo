import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import UserNewsletter from "@/models/userNewsletter";
import { createTransport } from "nodemailer";
import motivationalEmail from "../../newsletters/motivationalEmail4.js";
import letsTalkSpainEmail from "../../newsletters/letsTalkSpainEmail3.js";
import iSolveProblemsEmail from "../../newsletters/iSolveProblemsEmail5.js";
import welcomingEmail from "../../newsletters/welcomingEmail.js";
import friendsEmail from "../../newsletters/7Email.js";
import goodTeacherEmail from "../../newsletters/6Email.js";
import psychologyLearningEmail from "../../newsletters/8Email.js";
import noSaboKidsEmail from "../../newsletters/9Email.js";
import spanishCultureEmail from "../../newsletters/10Email.js";
import successStudentEmail from "../../newsletters/11Email.js";

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

  {
    subject: "🔴 I solve problems.",
    html: friendsEmail(),
  },

  {
    subject: "🔴 I solve problems.",
    html: goodTeacherEmail(),
  },

  {
    subject: "🔴 I solve problems.",
    html: psychologyLearningEmail(),
  },

  {
    subject: "🔴 I solve problems.",
    html: noSaboKidsEmail(),
  },

  {
    subject: "🔴 I solve problems.",
    html: spanishCultureEmail(),
  },

  {
    subject: "🔴 I solve problems.",
    html: successStudentEmail(),
  },
];

const sendEmails = async (email, posicion) => {
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: emails[posicion].subject,
    html: emails[posicion].html,
  });
};

export const GET = async () => {
  await connectMongoDB();

  const newsletterList = await UserNewsletter.find();

  console.log("counterEmails funcionando");

  for (const user of newsletterList) {
    if (user.contador < emails.length) {
      await sendEmails(user.email, user.contador);

      await UserNewsletter.updateOne(
        { _id: user._id },
        { $inc: { contador: 1 } },
      );
    }
  }

  return NextResponse.json({
    response: "ok",
  });
};
