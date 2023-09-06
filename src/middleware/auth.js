import jwt from 'jsonwebtoken';

const verifyAuthToken = (req, res, next) => {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      res.send({
        status: 'error',
        message: 'erro inesperado',
      });
    }
    const authHeader = req.headers.authorization;
    const currentToken = authHeader && authHeader.split(' ')[1];

    if (!currentToken) {
      return res.sendStatus(401);
    }

    jwt.verify(currentToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return next(error);
      }
      if (user) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
  } catch (error) {
    next(error);
  }
};

export default verifyAuthToken;
