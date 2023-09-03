/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException.js';

const verifyAuthToken = (req, res, next) => {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new HttpException(403, 'Token not found');
    }
    const authHeader = req.headers.authorization;
    const currentToken = authHeader && authHeader.split(' ')[1];

    if (!currentToken) {
      return res.sendStatus(401);
    }

    jwt.verify(currentToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        // Encaminhe o erro para o próximo middleware de tratamento de erros
        return next(error);
      }
      if (user) {
        // Continue para o próximo middleware
        next();
      } else {
        res.sendStatus(403);
      }
    });
  } catch (error) {
    // Encaminhe o erro para o próximo middleware de tratamento de erros
    next(error);
  }
};

export default { verifyAuthToken };
