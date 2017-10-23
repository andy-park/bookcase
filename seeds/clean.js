
exports.seed = function(knex, Promise) {
  return Promise.all([
  knex("connections").del(),
  knex("user_books").del(),
  knex("books").del(),
  knex("users").del()
  ])
};
