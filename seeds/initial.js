
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex("users")
      .returning("id")
      .insert([
        {
          email: 'homer.simpson@simpsons.com', 
          password_hash: '1234', 
          first_name: 'Homer', 
          last_name: 'Simpson'
        },
        {
          email: 'peter.griffin@familyguy.com', 
          password_hash: '1234', 
          first_name: 'Peter', 
          last_name: 'Griffin'
        },
        {
          email: 'wilma.flinstone@flinstones.com', 
          password_hash: '1234', 
          first_name: 'Wilma', 
          last_name: 'Flinstone'
        },
        {
          email: 'george.jetson@jetsons.com', 
          password_hash: '1234', 
          first_name: 'George', 
          last_name: 'Jetson'
        }
      ]),
    knex("books")
      .returning("id")
      .insert([
        {
          title: "The Rover Adventures", 
          author: "Roddy Doyle", 
          isbn: "9781407108605", 
          year: 2008, 
          publisher: "Scholastic Ltd", 
          bestseller: 'false'
        },
        {
          title: "Geronimo Stilton The Volcano of Fire", 
          author: "Elisabetta Dami", 
          isbn: "9780545556255", 
          year: 2013, 
          publisher: "Scholastic Inc", 
          bestseller: 'false'
        },
        {
          title: "The Titan's Curse", 
          author: "Rick Riordan", 
          isbn: "9780545057042", 
          year: 2007, 
          publisher: "Scholastic Inc", 
          bestseller: 'false'
        },
        {
          title: "Big Nate Welcome to My World", 
          author: "Lincoln Peirce", 
          isbn: "9781449462260", 
          year: 2015, 
          publisher: "Andrews McMeel Publishing", 
          bestseller: 'false'
        }
      ])
  ]).then(([book_ids, user_ids]) => {
    return knex("user_books")
      .insert([
        {
          user_id: user_ids[0],
          book_id: book_ids[0],
          status: "true"
        },
        {
          user_id: user_ids[0],
          book_id: book_ids[1],
          status: "true"
        },
        {
          user_id: user_ids[1],
          book_id: book_ids[2],
          status: "true"
        },
        {
          user_id: user_ids[1],
          book_id: book_ids[3],
          status: "true"
        }
      ])
      .then(() => {
        return knex("connections").insert([
          {
            user1_id: user_ids[0],
            user2_id: user_ids[1]
          }
        ]);
      });
  });
}