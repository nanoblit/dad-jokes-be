const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        next();
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    next();
  }
}

module.exports = authenticate;