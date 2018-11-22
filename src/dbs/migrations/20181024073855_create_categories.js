
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function(t) {
      t.increments('category_id').notNull().primary();
      t.string('category_name').unique().notNull();
      t.string('slug');
      t.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
