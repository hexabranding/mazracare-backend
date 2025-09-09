import Enquiry from '../models/enquiry.model.js';

// User creates enquiry
export const createEnquiry = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Handle uploaded images
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push({
          url: file.path,
          public_id: file.filename
        });
      });
    }
    
    // Parse array fields from form-data
    const parseArrayField = (field) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch {
          return field.split(',').map(item => item.trim());
        }
      }
      return [];
    };
    
    // Parse string fields from form-data
    const parseStringField = (field) => {
      if (!field) return '';
      if (Array.isArray(field)) return field[0] || '';
      return field.toString();
    };
    // data
    const enquiryData = {
      userId: userId,
      fullName: parseStringField(req.body.fullName),
      company: parseStringField(req.body.company),
      email: parseStringField(req.body.email),
      phone: parseStringField(req.body.phone),
      location: parseStringField(req.body.location),
      siteTypes: parseArrayField(req.body.siteTypes),
      siteTypeOther: parseStringField(req.body.siteTypeOther),
      spaceType: parseStringField(req.body.spaceType),
      siteArea: parseStringField(req.body.siteArea),
      siteAreaCustom: parseStringField(req.body.siteAreaCustom),
      files: parseStringField(req.body.files),
      purpose: parseArrayField(req.body.purpose),
      purposeOther: parseStringField(req.body.purposeOther),
      technology: parseStringField(req.body.technology),
      waterAvailable: parseStringField(req.body.waterAvailable),
      waterType: parseStringField(req.body.waterType),
      electricityAvailable: parseStringField(req.body.electricityAvailable),
      powerBackup: parseStringField(req.body.powerBackup),
      greenhouseRequired: parseStringField(req.body.greenhouseRequired),
      budget: parseStringField(req.body.budget),
      timeline: parseStringField(req.body.timeline),
      additionalServices: parseArrayField(req.body.additionalServices),
      serviceOther: parseStringField(req.body.serviceOther),
      message: parseStringField(req.body.message),
      crops: parseArrayField(req.body.crops),
      customCrop: parseStringField(req.body.customCrop),
      images: images
    };
    
    const enquiry = new Enquiry(enquiryData);
    await enquiry.save();
    res.status(201).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Admin lists all enquiries with pagination and filters
export const getAllEnquiries = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Enquiry.countDocuments(filter);

    res.json({
      success: true,
      data: enquiries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update enquiry status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('userId', 'name email');
    
    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }
    
    res.json({ success: true, data: enquiry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default { createEnquiry, getAllEnquiries, updateStatus };