import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
  getList,
  patchUser,
  postSignin,
  postSignup,
} from '../../models/user/index.js';
import 'dotenv/config';
import { postTeam } from '../../models/team/index.js';
import verifyAuthToken from '../../middleware/auth.js';
import { signinSchema, listUsersSchema } from './schemaValidation.js';
import createValidatorMiddleware from '../../middleware/createValidatorMiddleware.js';

const router = Router();

const signinValidation = createValidatorMiddleware(signinSchema);
const listValidation = createValidatorMiddleware(listUsersSchema);

router.post('/signin', signinValidation, async (req, res, next) => {
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
        document: response.document,
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
});
router.post(
  '/signup',

  async (req, res, next) => {
    try {
      if (req.query.typeOfAccess === 'Colaborador') {
        const response = await postSignup(req.query);
        res.send(response);
      } else if (req.query.typeOfAccess === 'Lider') {
        // somente administrador podera criar lider
        if (req.query.nameTeam && req.query.statusTeam) {
          const resultTeam = await postTeam({
            name: req.query.nameTeam,
            status: req.query.statusTeam,
          });

          req.query.teamId = resultTeam.document[0].id;
          const response = await postSignup(req.query);
          res.send(response);
        } else {
          res.status(402).send({
            status: 'error',
            message:
              'Variaveis nome da equipe e status da equipe não recebidos.',
          });
        }
      } else {
        res.status(402).send({
          status: 'error',
          message: 'Tipo de acesso ainda nao foi tratado.',
        });
      }
    } catch (error) {
      res.status(502).send({
        status: 'error',
        message: 'Contate o suporte.',
      });
      next(error);
    }
  },
);
router.get('/list', listValidation, verifyAuthToken, async (req, res) => {
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

router.patch('/changeData', verifyAuthToken, async (req, res) => {
  try {
    const response = await patchUser(req.query.cpf, req.query);
    res.send(response);
  } catch (error) {
    return res.status(502).send({
      status: 'error',
      message: 'Contate o suporte.',
    });
  }
});

export default router;
