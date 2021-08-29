import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    active: { type: Boolean, default: true, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema, 'User');
