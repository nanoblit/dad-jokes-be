const db = require('./dbConfig');

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserByName(username) {
  return db('users')
    .where({ username })
    .first();
}

async function addUser(data) {
  const [id] = await db('users').insert(data);
  return getUserById(id);
}

function getAllJokes() {
  return db('jokes');
}

function getJokeById(id) {
  return db('jokes')
    .where({ id })
    .first();
}

function getUsersJokes(userId) {
  return db('jokes').where({ userId });
}

async function addJoke(data) {
  const [id] = await db('jokes').insert(data);
  return getJokeById(id);
}

async function removeJoke(id) {
  const joke = await getJokeById(id);
  await db('jokes')
    .where({ id })
    .del();
  return joke;
}

module.exports = {
  getUserByName,
  addUser,
  getAllJokes,
  getUsersJokes,
  addJoke,
  getJokeById,
  removeJoke,
};
