
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chapters', function(t) {
      t.increments('chapter_id').notNull().primary();
      t.integer('manga_id')
          .unsigned()
          .nullable()
          .references('manga_id')
          .inTable('mangas')
          .onDelete('CASCADE');
      t.integer('chapter').default(0);
      t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chapters');
};
