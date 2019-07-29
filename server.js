const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const signUpInRoutes = require('./routes/signUpInRoutes');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/', signUpInRoutes);

server.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  next();
});

module.exports = server;
