
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chapter_files', function(t) {
      t.increments('id').notNull().primary();
      t.integer('chapter_id')
          .unsigned()
          .nullable()
          .references('chapter_id')
          .inTable('chapters')
          .onDelete('CASCADE');

      t.integer('file_id')
          .unsigned()
          .nullable()
          .references('file_id')
          .inTable('files')
          .onDelete('CASCADE');
      t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chapter_files');
};
