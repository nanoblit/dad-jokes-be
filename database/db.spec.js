const knex = require('./dbConfig');
const db = require('./db');

beforeEach(async () => {
  await knex('users').truncate();
  await knex('jokes').truncate();
});

afterEach(async () => {
  await knex('users').truncate();
  await knex('jokes').truncate();
});

describe('db.getUserById()', () => {
  it('returns the correct user', async () => {
    let user = await db.getUserById(10);
    expect(user).toBeUndefined();

    await knex('users').insert({ username: 'Adam', password: 'a' });

    user = await db.getUserById(1);
    expect(user).toEqual({ id: 1, username: 'Adam', password: 'a' });
  });
});

describe('db.getUserByName()', () => {
  it('returns the correct user', async () => {
    let user = await db.getUserByName('Josh');
    expect(user).toBeUndefined();

    await knex('users').insert({ username: 'Josh', password: 'a' });

    user = await db.getUserByName('Josh');
    expect(user).toEqual({ id: 1, username: 'Josh', password: 'a' });
  });
});

describe('db.addUser()', () => {
  it('adds a user and returns them', async () => {
    const user = await db.addUser({ username: 'Betty', password: 'a' });
    expect(user).toEqual({ id: 1, username: 'Betty', password: 'a' });
  });
});

describe('db.getAllJokes()', () => {
  it('returns the all jokes', async () => {
    let jokes = await db.getAllJokes();
    expect(jokes).toHaveLength(0);

    await knex('jokes').insert({ joke: 'Knock knock', userId: '5', isPrivate: false });

    jokes = await db.getAllJokes();
    expect(jokes).toHaveLength(1);
  });
});

describe('db.getJokeById()', () => {
  it('returns the correct joke', async () => {
    let joke = await db.getJokeById(1);
    expect(joke).toBeUndefined();

    await knex('jokes').insert({ joke: 'What a funny joke', userId: 10, isPrivate: false });

    joke = await db.getJokeById(1);
    expect(joke).toEqual({
      id: 1,
      joke: 'What a funny joke',
      userId: 10,
      isPrivate: 0,
    });
  });
});

describe('db.getUsersJokes()', () => {
  it('returns jokes', async () => {
    let jokes = await db.getUsersJokes(10);
    expect(jokes).toHaveLength(0);

    await knex('jokes').insert({ joke: 'First joke', userId: 10, isPrivate: false });
    await knex('jokes').insert({ joke: 'Second joke', userId: 10, isPrivate: false });

    jokes = await db.getUsersJokes(10);
    expect(jokes).toHaveLength(2);
  });
});

describe('db.addJoke()', () => {
  it('adds a joke and returns it', async () => {
    const joke = await db.addJoke({ joke: 'First joke', userId: 10, isPrivate: false });
    expect(joke).toEqual({
      id: 1,
      joke: 'First joke',
      userId: 10,
      isPrivate: 0,
    });
  });
});

describe('db.updateJoke()', () => {
  it('updates a joke and returns it', async () => {
    await knex('jokes').insert({ joke: 'Joke to update', userId: 10, isPrivate: false });
    const joke = await db.updateJoke(1, { joke: 'Updated joke', isPrivate: false });
    expect(joke).toEqual({
      id: 1,
      joke: 'Updated joke',
      userId: 10,
      isPrivate: 0,
    });
  });
});

describe('db.removeJoke()', () => {
  it('removes a joke and returns it', async () => {
    await knex('jokes').insert({ joke: 'Joke to remove', userId: 10, isPrivate: false });
    const joke = await db.removeJoke(1);
    expect(joke).toEqual({
      id: 1,
      joke: 'Joke to remove',
      userId: 10,
      isPrivate: 0,
    });
    const jokesArray = await knex('jokes');
    expect(jokesArray).toHaveLength(0);
  });
});
