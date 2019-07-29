exports.up = function (knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments();
      table
        .string('username', 255)
        .notNullable()
        .unique();
      table.string('password', 255).notNullable();
    })
    .createTable('jokes', table => {
      table.increments();
      table.string('joke', 1024).notNullable();
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable();
      table.boolean('isPrivate').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('jokes').dropTableIfExists('users');
};
