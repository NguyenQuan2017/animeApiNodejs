
exports.up = function(knex, Promise) {
  return knex.schema.createTable('genres', function(t) {
      t.increments('genre_id').notNull().primary();
      t.string('genre_name').notNull().unique();
      t.string('slug');
      t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('genres');
};
