import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: String,
  photo: String,
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  theme: {
    type: String,
    enum: ['slate', 'solar', 'superhero'],
    default: 'slate',
  },
});

export const User = mongoose.model('User', schema);
