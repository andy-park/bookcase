
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
        },
        { 
          title: 'Lego Star Wars Character Encyclopedia',
          author: 'Hannah Dolan',
          isbn: '9780756686970',
          picture: 'http://books.google.com/books/content?id=sfpLYgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: '"Who Could That Be at This Hour?"',
          author: 'Lemony Snicket',
          isbn: '9780316123082',
          picture: 'http://books.google.com/books/content?id=a2SFtwAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'The LEGO Ideas Book',
          author: 'Daniel Lipkowitz',
          isbn: '9780756686062',
          picture: 'http://books.google.com/books/content?id=-Q5bYgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'Ninjago Character Encyclopedia',
          author: 'Claire Sipi',
          isbn: '9780756698126',
          picture: 'http://books.google.com/books/content?id=VRB6tgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'The Lego Book',
          author: 'Daniel Lipkowitz',
          isbn: '9780756666934',
          picture: 'http://books.google.com/books/content?id=4bj_ngEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'The Heroes of Olympus: The Demigod Diaries',
          author: 'Rick Riordan',
          isbn: '9781423163008',
          picture: 'http://books.google.com/books/content?id=omomnwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'Descendants: Junior Novel',
          author: 'Disney Book Group',
          isbn: '9781484726143',
          picture: 'http://books.google.com/books/content?id=Ml3KrQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'Serafina and the Black Cloak',
          author: 'Robert Beatty',
          isbn: '9781484709016',
          picture: 'http://books.google.com/books/content?id=JZ3FrQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'Descendants: Mal\'s Spell Book',
          author: 'Disney Book Group',
          isbn: '9781484726389',
          picture: 'http://books.google.com/books/content?id=nJLFrQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'The Isle of the Lost',
          author: 'Melissa de la Cruz',
          isbn: '9781484720974',
          picture: 'http://books.google.com/books/content?id=DHzwoQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'A Long Walk to Water',
          author: 'Linda Sue Park',
          isbn: '9780547577319',
          picture: 'http://books.google.com/books/content?id=dYRIewAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'The One and Only Ivan',
          author: 'Katherine Applegate',
          isbn: '9780061992278',
          picture: 'http://books.google.com/books/content?id=bSnQngEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'The Princess in Black',
          author: 'Shannon Hale',
          isbn: '9780763678883',
          picture: 'http://books.google.com/books/content?id=VVEFoQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'The Care & Keeping of You',
          author: 'Valorie Lee Schaefer',
          isbn: '9781609580834',
          picture: 'http://books.google.com/books/content?id=NP-cngEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'Miss Peregrine\'s Home for Peculiar Children',
          author: 'Ransom Riggs',
          isbn: '9781594746031',
          picture: 'http://books.google.com/books/content?id=6DT9kQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
        },
        { 
          title: 'Hollow City',
          author: 'Ransom Riggs',
          isbn: '9781594747359',
          picture: 'http://books.google.com/books/content?id=WtyuoQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          bestseller: 'true'
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