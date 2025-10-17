import Address from '../models/address.model.js';
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/ApiError.js';

export const addAddress = catchAsync(async (req, res, next) => {
  const { firstName, lastName, address, company, town, email, phone } = req.body;
  const userId = req.user.id;

  if (!firstName || !lastName || !address || !town || !email || !phone) {
    return next(new ApiError(400, 'Required fields: firstName, lastName, address, town, email, phone'));
  }

  const newAddress = await Address.create({
    firstName,
    lastName,
    address,
    company,
    town,
    email,
    phone,
    userId
  });

  res.status(201).json({
    success: true,
    data: newAddress,
    message: 'Address added successfully'
  });
});

export const getUserAddresses = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  
  const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: addresses
  });
});

export const updateAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const address = await Address.findOne({ _id: id, userId });
  if (!address) return next(new ApiError(404, 'Address not found'));

  const updatedAddress = await Address.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    success: true,
    data: updatedAddress,
    message: 'Address updated successfully'
  });
});

export const deleteAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const address = await Address.findOne({ _id: id, userId });
  if (!address) return next(new ApiError(404, 'Address not found'));

  await Address.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Address deleted successfully'
  });
});