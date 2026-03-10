import mongoose from "mongoose";

const UserNewsletterSchema = new mongoose.Schema({
  email: String,
  fecha: Date,
  contador: { type: Number, default: 0 },
});

const UserNewsletter =
  mongoose.models.UserNewsletter ||
  mongoose.model("UserNewsletter", UserNewsletterSchema);

export default UserNewsletter;
