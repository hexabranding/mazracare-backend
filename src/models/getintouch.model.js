import mongoose from 'mongoose';

const getInTouchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['pending', 'verified'], default: 'pending' }
}, {
  timestamps: true
});

export default mongoose.model('GetInTouch', getInTouchSchema);