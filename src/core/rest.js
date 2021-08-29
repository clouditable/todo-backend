import { Router } from 'express';
import authorization from '../authorization/controller';
import todo from '../todo/controller';

const router = Router();

router.get('/', (req, res) => {
  res.send('app-root');
});

router.use('/authorization', authorization);
router.use('/todo', todo);
export default router;
