
exports.up = function(knex, Promise) {
    return knex.schema.createTable('mangas', function(t) {
        t.increments('manga_id').notNull().primary();
        t.string('manga_name').notNull().unique();
        t.string('slug');
        t.text('content').nullable();
        t.string('episode').nullable();
        t.string('view').nullable();
        t.timestamps()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mangas')
};
