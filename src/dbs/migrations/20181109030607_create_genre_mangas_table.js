
exports.up = function(knex, Promise) {
  return knex.schema.createTable('genre_mangas', function(t) {
      t.increments('id').notNull().primary();
      t.integer('genre_id').unsigned();
      t.foreign('genre_id').references('genre_id')
          .on('genres')
          .onDelete('CASCADE');
      t.integer('manga_id').unsigned();
      t.foreign('manga_id').references('manga_id')
          .on('mangas')
          .onDelete('CASCADE');
      t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('genre_mangas');
};
