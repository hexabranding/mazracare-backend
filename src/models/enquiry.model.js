import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
  fullName: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String },
  siteTypes: [{ type: String }],
  siteTypeOther: { type: String },
  spaceType: { type: String },
  siteArea: { type: String },
  siteAreaCustom: { type: String },
  files: { type: String },
  purpose: [{ type: String }],
  purposeOther: { type: String },
  technology: { type: String },
  waterAvailable: { type: String },
  waterType: { type: String },
  electricityAvailable: { type: String },
  powerBackup: { type: String },
  greenhouseRequired: { type: String },
  budget: { type: String },
  timeline: { type: String },
  additionalServices: [{ type: String }],
  serviceOther: { type: String },
  message: { type: String },
  crops: [{ type: String }],
  customCrop: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Enquiry', enquirySchema);