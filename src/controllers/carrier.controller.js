import Carrier from '../models/carrier.model.js';

// Create carrier application
export const createCarrier = async (req, res) => {
  try {
    // Handle uploaded PDF
    let pdfData = {};
    if (req.file) {
      pdfData = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }
    
    const carrierData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      experience: req.body.experience ? parseInt(req.body.experience) : undefined,
      skills: req.body.skills,
      message: req.body.message,
      ...pdfData
    };
    
    const carrier = new Carrier(carrierData);
    await carrier.save();
    
    res.status(201).json({
      success: true,
      message: 'Carrier application submitted successfully',
      data: carrier
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all carrier applications with pagination
export const getAllCarriers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Carrier.countDocuments();
    const carriers = await Carrier.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: carriers,
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