
exports.up = function(knex, Promise) {
  return knex.schema.table("books", (table) => {
    table.string("picture");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("books", (table) => {
    table.dropColumn("picture");
  });
};
