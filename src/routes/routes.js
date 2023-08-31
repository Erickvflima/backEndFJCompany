import { Router } from 'express';
// import users, { routersSignin } from '@controllers/users/routes';
// eslint-disable-next-line import/extensions
import validation from '../controllers/validation.js';

const router = Router();

// router.use('/', routersSignin);
router.use('/validation', validation);

export default router;
