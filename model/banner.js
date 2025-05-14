import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  imageUrl: String,
  link: String,
  active: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
