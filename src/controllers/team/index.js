import { Router } from 'express';
import { getListTeam } from '../../models/team/index.js';
import 'dotenv/config';
import { postTeam } from '../../models/team/index.js';
import verifyAuthToken from '../../middleware/auth.js';

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const response = await getListTeam(req.query);
    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(502).send({
      status: 'error',
      message: 'Contate o suporte.',
    });
  }
});
router.post('/new', verifyAuthToken, async (req, res) => {
  try {
    const response = await postTeam({
      name: req.query.name,
      status: req.query.status,
    });
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
