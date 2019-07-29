const express = require('express');

const db = require('../database/db');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.joke || body.userId === undefined || body.isPrivate === undefined) {
      res.status(400).json({ error: 'Joke, userId and isPrivate are required' });
    } else {
      const joke = await db.addJoke(body);
      res.status(201).json(joke);
    }
  } catch (error) {
    next(error);
  }
});

// Needs to return the deleted joke
router.delete('/', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
