import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Ad = mongoose.model('Ad', adSchema);
export default Ad;
