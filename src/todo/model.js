import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: Schema.ObjectId,
    },
    active: { type: Boolean, default: true, required: true },
  },
  { timestamps: true },
);

export const Todo = mongoose.model('Todo', todoSchema, 'Todo');
