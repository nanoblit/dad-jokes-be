const express = require('express');

const db = require('../database/db');
const authenticate = require('../middleware/authenticate');
const optionalAuthenticate = require('../middleware/optionalAuthenticate');

const router = express.Router();

router.get('/', optionalAuthenticate, async (req, res, next) => {
  try {
    const userId = req.user ? req.user.sub : undefined;
    const jokes = await db.getAllJokes();
    const jokesToSend = jokes.filter(joke => {
      if (joke.isPrivate && joke.userId === userId) {
        return true;
      }
      if (joke.isPrivate) {
        return false;
      }
      return true;
    });
    res.status(200).json(jokesToSend);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', optionalAuthenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.sub : undefined;
    if (id === 'mine') {
      if (!userId) {
        res.status(401).json({ error: 'You are not authorized to see these jokes' });
      } else {
        const jokes = await db.getUsersJokes(userId);
        res.status(200).json(jokes);
      }
    } else {
      const joke = await db.getJokeById(id);
      if (!joke) {
        res.status(404).json({ error: "Joke with given id doesn't exist" });
      } else if (joke.isPrivate && joke.userId !== userId) {
        res.status(401).json({ error: 'You are not authorized to see this joke' });
      } else {
        res.status(200).json(joke);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { joke, isPrivate } = req.body;
    const userId = req.user.sub;
    const jokeToChange = await db.getJokeById(id);
    if (!jokeToChange) {
      res.status(404).json({ error: "Joke with given id doesn't exist" });
    } else if (userId !== jokeToChange.userId) {
      res.status(401).json({ error: 'You are not authorized to change this jokes' });
    } else {
      const jokeToReturn = await db.updateJoke(id, { joke, isPrivate });
      res.status(200).json(jokeToReturn);
    }
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
