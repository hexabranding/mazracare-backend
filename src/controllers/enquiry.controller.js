import Enquiry from '../models/enquiry.model.js';

// User creates enquiry
export const createEnquiry = async (req, res) => {
  try {
    const userId = req.user._id;
    const enquiry = new Enquiry({
      ...req.body,
      userId: userId
    });
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