const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 's564fs654ADsd65ADShliul.%@$^tdfdsg$^kit56456';

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).json(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

module.exports = {
  authenticate,
};
