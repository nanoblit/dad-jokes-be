const express = require('express');

const db = require('../database/db');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { body } = req;
    const userId = req.user.sub;
    if (!body.joke || body.isPrivate === undefined) {
      res.status(400).json({ error: 'Joke, userId and isPrivate are required' });
    } else {
      const joke = await db.addJoke({ ...body, userId });
      res.status(201).json(joke);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;
    const joke = await db.getJokeById(id);
    if (!joke) {
      res.status(404).json({ error: 'Joke not found' });
    } if (joke.userId !== userId) {
      res.status(401).json({ error: 'You are not authorized to delete this joke' });
    } else {
      await db.removeJoke(id);
      res.status(200).json(joke);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
