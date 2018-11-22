
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments('user_id').notNull().primary();
    t.string('firstName');
    t.string('lastName');
    t.string('userName').unique();
    t.string('email').unique();
    t.string('password');
    t.timestamps()
  })
};

exports.down = function( knex, Promise) {
  return knex.schema.dropTable('users');
};
