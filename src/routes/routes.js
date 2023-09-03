import { Router } from 'express';
import validation from '../controllers/validation.js';
import user from '../controllers/user/index.js';

const router = Router();

router.use('/validation', validation);
router.use('/user', user);

export default router;
