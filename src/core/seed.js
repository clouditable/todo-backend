import bcrypt from 'bcrypt';

import { User } from '../authorization/model';

export const seed = async () => {
  const isUserExist = await User.findOne({ username: 'user' });
  if (!isUserExist) {
    const userData = {
      username: 'user',
      password: await bcrypt.hash('123456', 10),
    };
    const user = new User(userData);
    await user.save();
  }
};
