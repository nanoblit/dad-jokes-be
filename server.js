const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const signUpInRoutes = require('./routes/signUpInRoutes');
const jokesRoutes = require('./routes/jokesRoutes');
const errorHandler = require('./middleware/errorHandler');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/', signUpInRoutes);
server.use('/jokes', jokesRoutes);

server.use(errorHandler);

module.exports = server;
