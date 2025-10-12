import ProductDetailsCustomisation from '../models/productDetailsCustomisation.model.js';
import { sendEmail } from '../config/email.js';
import { productDetailsCustomisationNotificationTemplate } from '../utils/templates.js';
import { company_email } from '../config/index.js';

// Create product details customisation
export const createProductDetailsCustomisation = async (req, res) => {
  try {
    const userId = req.user._id;

    const productDetails = new ProductDetailsCustomisation({
      ...req.body,
      userId: userId
    });
    
    await productDetails.save();
    
    // Send notification email
    try {
      const emailTemplate = productDetailsCustomisationNotificationTemplate(productDetails, req.user);
      await sendEmail(
        company_email,
        'New Product Details Customisation - Mazracare',
        emailTemplate
      );
    } catch (emailError) {
      console.error('Failed to send product details customisation notification email:', emailError.message);
    }
    
    res.status(201).json({
      success: true,
      message: 'Product details customisation created successfully',
      data: productDetails
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all product details customisations for admin with pagination
export const getAllProductDetailsCustomisations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await ProductDetailsCustomisation.countDocuments();
    const productDetails = await ProductDetailsCustomisation.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: productDetails,
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

// Get user's own product details customisations
export const getUserProductDetailsCustomisations = async (req, res) => {
  try {
        const userId = req.user._id;

    const productDetails = await ProductDetailsCustomisation.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: productDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user's own product details customisations
export const getUserSingleProductDetailsCustomisations = async (req, res) => {
  try {
    const { id } = req.query;

    const productDetails = await ProductDetailsCustomisation.findOne({ _id: id })
      .sort({ createdAt: -1 });

    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: 'Product details customisation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: productDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

  