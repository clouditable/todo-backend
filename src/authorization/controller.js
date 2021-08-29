import { Router } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './model';
import { SECRET } from '../env';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const payload = {
        userId: user._id,
        expires: Date.now() + 3 * 60 * 60 * 1000,
      };
      req.login(payload, { session: false }, error => {
        if (error) res.status(400).json({ status: false, message: error });
        const token = jwt.sign(JSON.stringify(payload), SECRET);
        res.status(200).json({ status: true, user: { ...user, token } });
      });
    } else {
      res.status(400).json({ status: false });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
});

export default router;
