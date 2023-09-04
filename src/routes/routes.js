import { Router } from 'express';
import validation from '../controllers/validation.js';
import user from '../controllers/user/index.js';
import message from '../controllers/message/index.js';
import team from '../controllers/team/index.js';

const router = Router();

router.use('/validation', validation);
router.use('/user', user);
router.use('/message', message);
router.use('/team', team);

export default router;
