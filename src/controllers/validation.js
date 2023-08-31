import { Router } from 'express';

import 'dotenv/config';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.send({
      status: 'success',
      message: `Bem vindo a API de serviços de registro, ambiente:${process.env.BUCKETENVIROMENT}`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
