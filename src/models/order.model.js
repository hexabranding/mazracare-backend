// models/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    country: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  totalPrice: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['CashOnDelivery', 'Online'],
    default: 'CashOnDelivery',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending',
  },
  orderStatus: {
    type: String,
    enum: ['Pending','Processing', 'Preparing', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  notes: {
    type: String,
    default: '',
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
