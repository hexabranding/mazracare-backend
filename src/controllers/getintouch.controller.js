import GetInTouch from '../models/getintouch.model.js';
import { sendEmail } from '../config/email.js';
import { getInTouchNotificationTemplate } from '../utils/templates.js';
import { company_email } from '../config/index.js';

// User creates get in touch
export const createGetInTouch = async (req, res) => {
  try {
    const getInTouch = new GetInTouch(req.body);
    await getInTouch.save();
    
    // Send notification email
    try {
      const emailTemplate = getInTouchNotificationTemplate(req.body);
      await sendEmail(
        company_email,
        'New Get In Touch Request - Mazracare',
        emailTemplate
      );
    } catch (emailError) {
      console.error('Failed to send get in touch notification email:', emailError.message);
    }
    
    res.status(201).json({ success: true, data: getInTouch });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Admin lists all get in touch with pagination and filters
export const getAllGetInTouch = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const getInTouchList = await GetInTouch.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await GetInTouch.countDocuments(filter);

    res.json({
      success: true,
      data: getInTouchList,
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

// Admin lists all get in touch with pagination and filters
export const getSingleGetInTouch = async (req, res) => {
  try {
    const { id } = req.query;

    const getInTouch = await GetInTouch.findById(id);

    if (!getInTouch) {
      return res.status(404).json({
        success: false,
        message: 'Get in touch not found'
      });
    }

    res.status(200).json({
      success: true,
      data: getInTouch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
   

// Update get in touch status
export const updateGetInTouchStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id,'id');
    
    const getInTouch = await GetInTouch.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!getInTouch) {
      return res.status(404).json({ success: false, error: 'Get in touch not found' });
    }
    
    res.json({ success: true, data: getInTouch });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default { createGetInTouch, getAllGetInTouch, getSingleGetInTouch, updateGetInTouchStatus };