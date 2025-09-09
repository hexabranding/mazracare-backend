import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String },
    experience: { type: Number },
    skills: { type: String },
    message: { type: String },
    url: { type: String, required: true },
    public_id: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("carrier", enquirySchema);
