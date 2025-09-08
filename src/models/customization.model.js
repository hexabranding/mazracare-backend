import mongoose from 'mongoose';

const customizationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    crops: {
      type: [String],
      default: [],
    },
    customCrop: {
      type: String,
      trim: true,
      default: '',
    },
    width: {
      type: Number,
      required: true,
      min: 1,
    },
    height: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

const Customization = mongoose.model('Customization', customizationSchema);

export default Customization;