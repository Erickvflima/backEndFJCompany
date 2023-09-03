/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const token = (req, res, next) => {
  const currentToken = req.headers.authorization;

  if (!currentToken) {
    return res
      .status(401)
      .json({ message: 'Erro: currentToken não encontrado' });
  }
  jwt.verify(currentToken, 'stringsecret', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Erro: token Expirado' });
    req.userId = decoded.id;
    next();
  });
};

export default token;
