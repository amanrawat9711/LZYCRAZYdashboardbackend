import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  contact: String,
  location: String,
  logo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BusinessProfile = mongoose.model('BusinessProfile', businessSchema);
export default BusinessProfile;
