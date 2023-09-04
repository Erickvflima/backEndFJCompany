import { Router } from 'express';
import {
  deleteMessage,
  getList,
  postMessage,
  putMessage,
} from '../../models/message/index.js';
import 'dotenv/config';
// import { postTeam } from '../../models/team/index.js';

const router = Router();

router.get('/list', async (req, res) => {
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

router.delete('/', async (req, res) => {
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

router.put('/changeMessage', async (req, res) => {
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
});

router.post('/new', async (req, res) => {
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
