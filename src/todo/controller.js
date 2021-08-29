import { Router } from 'express';
import { Todo } from './model';

const router = Router();

router.get('', async (req, res) => {
  try {
    const user = req?.user;
    if (user) {
      const userId = user._id;
      const todos = await Todo.find({ userId });
      res.status(200).json({ status: true, todos });
    } else {
      res.status(400).json({ status: false });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
});

router.post('', async (req, res) => {
  try {
    const user = req?.user;
    const { content } = req.body;

    if (user && content.trim()) {
      const userId = user._id;
      const todo = new Todo({ userId, content });
      await todo.save();
      res.status(200).json({ status: true, todo });
    } else {
      res.status(400).json({ status: false });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
});

router.put('/:todoId', async (req, res) => {
  try {
    const user = req?.user;
    const { todoId } = req.params;
    const { status, content } = req.body;
    if (user && todoId) {
      const todo = await Todo.find({ _id: todoId });
      if (todo) {
        let data = {};
        if (typeof status === 'boolean') {
          data = { ...data, completed: status };
        }
        if (typeof content === 'string') {
          data = { ...data, content };
        }
        const newTodo = await Todo.findOneAndUpdate({ _id: todoId }, data, { new: true });
        res.status(200).json({ status: true, todo: newTodo });
      } else {
        res.status(400).json({ status: false });
      }
    } else {
      res.status(400).json({ status: false });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
});

router.delete('/:todoId', async (req, res) => {
  try {
    const user = req?.user;
    const { todoId } = req.params;
    if (user && todoId) {
      await Todo.deleteOne({ _id: todoId });
      res.status(200).json({ status: true });
    } else {
      res.status(400).json({ status: false });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
});

export default router;
