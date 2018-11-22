
exports.up = function(knex, Promise) {
    return knex.schema.createTable('category_mangas', function(t) {
        t.increments('id').notNull().primary();
        t.integer('category_id').unsigned();
        t.foreign('category_id').references('category_id')
            .on('categories')
            .onDelete('CASCADE');
        t.integer('manga_id').unsigned();
        t.foreign('manga_id').references('manga_id')
            .on('mangas')
            .onDelete('CASCADE');
        t.timestamps();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('category_mangas')
};
