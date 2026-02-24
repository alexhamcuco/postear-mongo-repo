import { config } from "dotenv";
config();

export const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
export const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL;
