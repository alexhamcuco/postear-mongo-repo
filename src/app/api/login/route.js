
import { NextResponse } from "next/server";


export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};



export const POST = async (req) => {
  const  {correo, contraseña} = await req.json();
console.log(correo,contraseña, process.env.CONTRASENA, process.env.CORREO)
 if (correo == process.env.CORREO && contraseña == process.env.CONTRASENA )  
 {
  return NextResponse.json({ message: "Usuario logeado" }, { status: 201 });

 }
  else
   {
  return NextResponse.json({ message: "error" }, { status: 404 });

 }
};