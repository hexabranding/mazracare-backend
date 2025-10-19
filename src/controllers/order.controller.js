import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../middlewares/catchAsync.js';
import User from '../models/user.model.js';
import { sendEmail } from '../config/email.js';

export const placeOrder = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const {
    shippingAddress,
    paymentMethod = 'CashOnDelivery',
  } = req.body;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return next(new ApiError(400, 'Cart is empty'));
  }

  let totalPrice = 0;
  const orderItems = [];

  for (let item of cart.items) {
    const product = item.product;

    if (!product || product.stock < item.quantity) {
      return next(new ApiError(400, `Not enough stock for ${product?.name || 'item'}`));
    }

    // Deduct stock
    product.stock -= item.quantity;
    await product.save();

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: item.priceAtAdded,
    });

    totalPrice += item.priceAtAdded * item.quantity;
  }

  const newOrder = await Order.create({
    user: userId,
    orderItems,
    shippingAddress,
    totalPrice,
    paymentMethod,
    paymentStatus: paymentMethod === 'Online' ? 'Pending' : 'Pending',
  });

  // Clear cart after order
  await Cart.findByIdAndDelete(cart._id);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: newOrder,
  });
});


export const directBuy = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity, shippingAddress, paymentMethod = 'CashOnDelivery' } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return next(new ApiError(400, 'Valid product and quantity are required'));
  }

  const product = await Product.findById(productId);
  if (!product) return next(new ApiError(404, 'Product not found'));

  if (product.stock < quantity) {
    return next(new ApiError(400, 'Not enough stock available'));
  }

  const price = product.discountedPrice || product.price;
  const totalPrice = price * quantity;

  // Reduce stock
  product.stock -= quantity;
  await product.save();

  const newOrder = await Order.create({
    user: userId,
    orderItems: [{
      product: product._id,
      quantity,
      price,
    }],
    shippingAddress,
    totalPrice,
    paymentMethod,
    paymentStatus: paymentMethod === 'Online' ? 'Pending' : 'Pending',
  });

  res.status(201).json({
    success: true,
    message: 'Order placed directly from product page',
    data: newOrder,
  });
});



export const getMyOrders = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const total = await Order.countDocuments({ user: userId });
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalOrders: total,
    data: orders,
  });
});



export const getAllOrders = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search, paymentStatus, orderStatus, paymentMethod, orderId, date } = req.query;

  const query = {};

  // Search by Order ID
  if (orderId) {
    query._id = orderId;
  }

  // Search by username or email (case-insensitive)
  if (search) {
    const users = await User.find({
      $or: [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }).select('_id');
    query.user = { $in: users.map(u => u._id) };
  }

  // Filter by date
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    query.createdAt = { $gte: startDate, $lt: endDate };
  }

  // Filters
  if (paymentStatus) query.paymentStatus = paymentStatus;
  if (orderStatus) query.orderStatus = orderStatus;
  if (paymentMethod) query.paymentMethod = paymentMethod;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('user', 'username email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit),
    totalOrders: total,
    data: orders,
  });
});



export const getSingleOrder = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  // Allow search by Order ID or user access to their own orders
  const query = { _id: id };
  if (req.user.role !== 'Admin') {
    query.user = req.user._id;
  }

  const order = await Order.findOne(query)
    .populate('user', 'username email')
    .populate('orderItems.product', 'name price slug description discountPercent discountedPrice');

  if (!order) return next(new ApiError(404, 'Order not found'));

  res.status(200).json({
    success: true,
    data: order,
  });
});



export const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const order = await Order.findById(id).populate('user', 'username email');
  if (!order) return next(new ApiError(404, 'Order not found'));

  const oldStatus = order.orderStatus;
  order.orderStatus = status;
  if (notes) order.notes = notes;
  await order.save();

  // Send email notification if status changed
  if (oldStatus !== status) {
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Status Update</h2>
        <p>Dear ${order.user.username},</p>
        <p>Your order <strong>#${order._id}</strong> status has been updated to: <strong>${status}</strong></p>
        ${notes ? `<p><strong>Note:</strong> ${notes}</p>` : ''}
        <p>Thank you for shopping with Mazracare!</p>
      </div>
    `;
    
    try {
      await sendEmail(order.user.email, `Order Status Update - ${status}`, emailTemplate);
    } catch (error) {
      console.error('Failed to send email notification:', error.message);
    }
  }

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: order,
  });
});
