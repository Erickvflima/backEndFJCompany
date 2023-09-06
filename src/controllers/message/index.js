import { Router } from 'express';
import {
  deleteMessage,
  getList,
  postMessage,
  putMessage,
  randomMessage,
} from '../../models/message/index.js';
import 'dotenv/config';
import verifyAuthToken from '../../middleware/auth.js';
import {
  listMessageSchema,
  changeMessageSchema,
  idMessageSchema,
  newMessageSchema,
  randomMessageSchema,
} from './schemaValidation.js';
import createValidatorMiddleware from '../../middleware/createValidatorMiddleware.js';

const router = Router();

const listValidation = createValidatorMiddleware(listMessageSchema);
const idValidation = createValidatorMiddleware(idMessageSchema);
const randomValidation = createValidatorMiddleware(randomMessageSchema);
const changeValidation = createValidatorMiddleware(changeMessageSchema);
const creteValidation = createValidatorMiddleware(newMessageSchema);

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

router.get(
  '/randomMessage',
  randomValidation,
  verifyAuthToken,
  async (req, res) => {
    try {
      const response = await randomMessage(req.query);
      res.send(response);
    } catch (error) {
      console.log(error);
      return res.status(502).send({
        status: 'error',
        message: 'Contate o suporte.',
      });
    }
  },
);

router.delete('/', idValidation, verifyAuthToken, async (req, res) => {
  try {
    const response = await deleteMessage(req.query);
    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(502).send({
      status: 'error',
      message: 'Contate o suporte.',
    });
  }
});

router.put(
  '/changeMessage',
  changeValidation,
  verifyAuthToken,
  async (req, res) => {
    try {
      const response = await putMessage(req.query);
      res.send(response);
    } catch (error) {
      console.log(error);
      return res.status(502).send({
        status: 'error',
        message: 'Contate o suporte.',
      });
    }
  },
);

router.post('/new', creteValidation, verifyAuthToken, async (req, res) => {
  try {
    const response = await postMessage(req.query);
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
