import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
  getList,
  patchUser,
  postSignin,
  postSignup,
} from '../../models/users/index.js';
import 'dotenv/config';

const router = Router();

router.post(
  '/signin',

  async (req, res, next) => {
    try {
      const response = await postSignin(req.query);

      if (response.status === 'success') {
        const { cpf } = req.params;
        if (!process.env.ACCESS_TOKEN_SECRET) {
          console.log(
            `Falha ao tentar logar o usuário ${req.params.cpf}, token secreto falhou`,
          );
          throw new Error('Fail to find token secret');
        }

        const token = jwt.sign({ cpf }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.EXPIRE_TOKEN_SECRET,
        });

        const { message, status } = response;
        res.send({
          status,
          message,
          user: req.params.cpf,
          token,
        });
      } else {
        console.log(
          `Falha ao tentar logar o usuário ${req.params.cpf}, usuário ou senha invalido`,
        );
        res.status(401).send(response);
      }
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/signup',

  async (req, res, next) => {
    try {
      const response = await postSignup(req.query);
      res.send(response);
    } catch (error) {
      res.status(502).send({
        status: 'error',
        message: 'Contate o suporte.',
      });
      next(error);
    }
  },
);
router.get('/list', async (req, res, next) => {
  try {
    const response = await getList(req.query);
    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(502).send({
      status: 'error',
      message: 'Contate o suporte.',
    });
  }
});

router.patch('/changeData', async (req, res, next) => {
  try {
    const response = await patchUser(req.query.cpf, req.query);
    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(502).send({
      status: 'error',
      message: 'Contate o suporte.',
    });
  }
});

export default router;
