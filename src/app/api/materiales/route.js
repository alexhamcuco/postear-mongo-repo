import connectMongoDB from "@/libs/mongodb";
import Material from "@/models/material";
import UserNewsletter from "@/models/userNewsletter"; // Importa el modelo de suscriptores
import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  await connectMongoDB();

  if (title) {
    const material = await Material.find({ titulo: title });
    return NextResponse.json(material, { headers: corsHeaders });
  } else {
    const materials = await Material.find({});
    return NextResponse.json(materials, { headers: corsHeaders });
  }
};

export const POST = async (req) => {
  const data = await req.json();
  console.log(data);
  await connectMongoDB();
  await Material.create(data);
  return NextResponse.json({ message: "Material Created" }, { status: 201 });
};

export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url);
  const titleToDelete = searchParams.get("title");

  await connectMongoDB();

  const deletedMaterial = await Material.deleteOne({ titulo: titleToDelete });

  if (deletedMaterial.deletedCount === 1) {
    return NextResponse.json({ message: "Material Deleted" }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Material Not Found" },
      { status: 404 }
    );
  }
};

export const PUT = async (req) => {
  const { searchParams } = new URL(req.url);
  const titleToUpdate = searchParams.get("title");

  if (!titleToUpdate) {
    return NextResponse.json(
      { message: "Title is required to update the material" },
      { status: 400, headers: corsHeaders }
    );
  }

  const data = await req.json();
  await connectMongoDB();

  const updatedMaterial = await Material.findOneAndUpdate(
    { titulo: titleToUpdate },
    data,
    { new: true }
  );

  if (updatedMaterial) {
    return NextResponse.json(
      { message: "Material updated successfully", material: updatedMaterial },
      { status: 200, headers: corsHeaders }
    );
  } else {
    return NextResponse.json(
      { message: "Material not found" },
      { status: 404, headers: corsHeaders }
    );
  }
};

//MANDAR CORREO A TODOS

export const sendNewsletterToAll = async (req) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Only POST method is allowed" },
      { status: 405 }
    );
  }

  const { content } = await req.json();

  if (!content) {
    return NextResponse.json(
      { message: "Email content is required" },
      { status: 400, headers: corsHeaders }
    );
  }

  await connectMongoDB();
  console.log("Conectado a MongoDB");
};
