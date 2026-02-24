import mongoose, { Schema } from "mongoose";

const materialSchema = new Schema({
  nivel: String,
  fecha: Date,
  palabrasClave: String,
  premium: Boolean,
  tipo: String,
  titulo: String,
  urlTitulo: String,
  urlImagen: String,
  descripcion: String,
  descripcionIngles: String,
  contenidoMaterial: String,
  contenidoMaterialIngles: String,
  autor: String,
  urlContenido: String,
  points: { type: Number, default: 0 }, // Add points property with default value 0
  sequentialNumber: { type: Number, required: true },
});

const Material =
  mongoose.models.Material || mongoose.model("Material", materialSchema);

export default Material;
