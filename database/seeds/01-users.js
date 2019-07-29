exports.seed = function (knex) {
  return knex('table_name')
    .del()
    .then(() => knex('table_name').insert([
      { id: 1, username: 'rowValue1', password: '' },
      { id: 2, username: 'rowValue2', password: '' },
      { id: 3, username: 'rowValue3', password: '' },
    ]));
};
