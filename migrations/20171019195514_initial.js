
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", function(table){
      table.increments();
      table.string("first_name");
      table.string("last_name");
      table.string("password_hash");
      table.string("email");
      table.timestamps();
    }),
    knex.schema.createTable("books", function(table){
      table.increments();
      table.string("title");
      table.string("author");
      table.string("isbn");
      table.integer("year");
      table.string("publisher");
      table.boolean("bestseller");
      table.string("reading_level");
      table.timestamps();
    }),
    knex.schema.createTable("user_books", function(table){
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users").notNull().onDelete("cascade");
      table.integer("book_id").unsigned().references("id").inTable("books").notNull().onDelete("cascade");
      table.string("status");
      table.timestamps();
    }),
    knex.schema.createTable("connections", function(table){
      table.increments();
      table.integer("user1_id").unsigned().references("id").inTable("users").notNull();
      table.integer("user2_id").unsigned().references("id").inTable("users").notNull();
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('connections'),
    knex.schema.dropTable('user_books'),
    knex.schema.dropTable('books'),
    knex.schema.dropTable('users')
  ])


};
