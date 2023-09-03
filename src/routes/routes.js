import { Router } from 'express';
import validation from '../controllers/validation.js';
import user from '../controllers/user/index.js';
import team from '../controllers/team/index.js';

const router = Router();

router.use('/validation', validation);
router.use('/user', user);
router.use('/team', team);

export default router;
