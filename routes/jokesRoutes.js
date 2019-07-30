const express = require('express');

const db = require('../database/db');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const userId = req.user ? req.user.sub : undefined;
    const jokes = await db.getAllJokes();
    const jokesToSend = jokes.filter(joke => {
      if (joke.isPrivate && joke.userId === userId) {
        return true;
      } if (joke.isPrivate) {
        return false;
      }
      return true;
    });
    res.status(200).json(jokesToSend);
  } catch (error) {
    next(error);
  }
});

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
    }
    if (joke.userId !== userId) {
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
