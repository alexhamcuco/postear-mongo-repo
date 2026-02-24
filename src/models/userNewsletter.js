import mongoose from "mongoose";

const userNewsletterSchema = new mongoose.Schema({
  email: String,
  fecha: Date,
  contador: { type: Number, default: 0 },
});

export default mongoose.model("UserNewsletter", userNewsletterSchema);
