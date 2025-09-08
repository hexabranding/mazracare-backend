import GetInTouch from '../models/getintouch.model.js';

// User creates get in touch
export const createGetInTouch = async (req, res) => {
  try {
    const getInTouch = new GetInTouch(req.body);
    await getInTouch.save();
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

export default { createGetInTouch, getAllGetInTouch, updateGetInTouchStatus };