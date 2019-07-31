const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const db = require('../database/db');

const router = express.Router();

function generateToken(user) {
  const payload = {
    username: user.username,
    sub: user.id,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

router.post('/signup', async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.username || !body.password) {
      res.status(400).json({ error: 'Userame and password are required' });
    } else if (await db.getUserByName(body.username)) {
      res.status(400).json({ error: 'Userame must be unique' });
    } else {
      const password = await bcrypt.hash(body.password, 12);
      const user = await db.addUser({ ...body, password });
      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db.getUserByName(username);
    if (!user || !bcrypt.compare(password, user.password)) {
      res.status(401).json({ error: 'Wrong username or password' });
    } else {
      const token = generateToken(user);
      res.status(200).json({ message: 'Logged in', token });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
