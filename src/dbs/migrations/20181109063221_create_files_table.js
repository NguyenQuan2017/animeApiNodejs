
exports.up = function(knex, Promise) {
    return knex.schema.createTable('files', function(t) {
        t.increments('file_id').notNull().primary();
        t.string('mimeType');
        t.string('name');
        t.string('slug');
        t.string('type').nullable();
        t.string('path');
        t.string('size');
        t.integer('user_id')
            .unsigned()
            .nullable()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE');

        t.integer('manga_id')
            .unsigned()
            .nullable()
            .references('manga_id')
            .inTable('mangas')
            .onDelete('CASCADE');
        t.timestamps();

    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('files');
};
