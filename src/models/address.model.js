import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  company: { type: String },
  town: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
export default Address;