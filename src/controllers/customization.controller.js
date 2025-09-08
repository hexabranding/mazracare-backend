import Customization from '../models/customization.model.js';

// Create customization
export const createCustomization = async (req, res) => {
  try {
      const userId = req.user._id;

    const customization = new Customization({
      ...req.body,
      userId: userId
    });
    
    await customization.save();
    
    res.status(201).json({
      success: true,
      message: 'Customization created successfully',
      data: customization
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all customizations for admin with pagination
export const getAllCustomizations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Customization.countDocuments();
    const customizations = await Customization.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: customizations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user's own customizations
export const getUserCustomizations = async (req, res) => {
  try {
      const userId = req.user._id;

    const customizations = await Customization.find({ userId: userId})
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: customizations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};