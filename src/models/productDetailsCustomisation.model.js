import mongoose from 'mongoose';

const productDetailsCustomisationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    crops: {
      type: [String], // array of selected crops
      default: [],
    },
    customCrop: {
      type: String, // user-defined custom crop
      trim: true,
    },
    typeOfSpace: {
      type: String, // indoor, outdoor, balcony, etc.
      trim: true,
    },
    siteArea: {
      type: String, // predefined options like 100-300 sqft
      trim: true,
    },
    customSiteArea: {
      type: String, // if user enters a custom site area
      trim: true,
    },
    sitePhotos: {
      type: [String], // store file paths or URLs of uploaded photos
      default: [],
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

const ProductDetailsCustomisation = mongoose.model('ProductDetailsCustomisation', productDetailsCustomisationSchema);

export default ProductDetailsCustomisation;