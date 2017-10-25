require("dotenv").load();
var PORT = process.env.PORT || 8080; // default port 8080

var express = require("express");
// const methodOverride = require('method-override');
// const bcrypt = require('bcrypt');
const request = require("request");
const urlEncode = require("urlencode");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const knex = require("knex")({
  client: 'pg',
  connection: {
    host: process.env.localhost,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  }
});

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// ENDPOINTS
app.get("/", (req, res) => {

  // This query retrieves a list of bestsellers.
  knex('books')
    .where('books.bestseller', 'true')
    .then((rows) => {
      titles = [];
      authors = [];
      thumbnails = [];
      for (var i = 0; i < rows.length; i++) {
        titles[i] = rows[i].title;
        authors[i] = rows[i].author;
        thumbnails[i] = rows[i].picture;
      };
      app.locals.titles = titles;
      app.locals.authors = authors;
      app.locals.thumbnails = thumbnails;
      res.render("index")
    });
});

app.post("/books", (req, res) => {
  const input = req.body.input;
  let title = [];
  let author = [];
  let thumbnail = [];

  searchBooks(input, (books) => {
    for (var i = 0; i < books.length; i++) {
      title[i] = books[i].title;
      author[i] = books[i].authors;
      thumbnail[i] = books[i].picture;
    };
    app.locals.title = title;
    app.locals.author = author;
    app.locals.thumbnail = thumbnail;
    res.render("index_show")
  });
});

app.get("/connections", (req, res) => {
  res.render("connections")
});

app.get("/library", (req, res) => {
  // This query retrieves a list of the user's books that are available to be loaned out.
  let userId = 1;

  knex
    .select()
    .from('user_books')
    .innerJoin('books', 'user_books.book_id', 'books.id')
    .where('user_books.user_id', userId)
    .then((rows) => {
      let title_loan = [];
      let author_loan = [];
      let status = [];
      
      for (var i = 0; i < rows.length; i++) {
        title_loan[i] = rows[i].title;
        author_loan[i] = rows[i].author;
        status[i] = rows[i].status;
      };
      app.locals.title_loan = title_loan;
      app.locals.author_loan = author_loan;
      app.locals.status = status;
      res.render("user_books")
    })
});

//Listening to the appropriate PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

function searchBooks(title, cb) {

  title = urlEncode(title);
  let url = "https://www.googleapis.com/books/v1/volumes" + "?q=" + title + "&key=" + process.env.GOOGLE_BOOKS_API

  const callback = function (error, response, body) {
    let result = JSON.parse(body);
    console.log(body);
    if (result) {
      books = [];
      result.items.forEach((item) => {
        book = {};
        book.title = item.volumeInfo.title;
        book.authors = item.volumeInfo.authors;
        book.isbn = item.volumeInfo.industryIdentifiers[1].identifier;
        book.picture = item.volumeInfo.imageLinks.smallThumbnail;
        books.push(book);
      })
      cb(books);
    }
    return;
  }
  request(url, callback);
}

/* This query allows the user to add a book to their list.

let isbn = "9781449462260"; // This item is in the books table.
let isbn2 = "9781449429379"; // This item will be added to the books table.
let title = "Big Nate I Can't Take It";
let author = "Lincoln Peirce";
let user_id = 1;

knex
  .column('id')
  .from('books')
  .where('isbn', isbn2)
  .then((rows) => {
    if(rows.length === 0) {
      console.log("ISBN not found in books table.");
      knex('books')
      .returning('id')
      .insert({ isbn: isbn2, title: title, author: author})
      .then((rows) => {
        knex('user_books')
        .returning('id')
        .insert({ user_id: user_id, book_id: rows[0], status: 'true'})
        .then((rows) => {
          console.log("Record added.");
        })
      })
    } 
    else 
    {
      console.log("ISBN found in books table.");
      knex('user_books')
      .returning('id')
      .insert({ user_id: user_id, book_id: rows[0].id, status: 'true'})
      .then((rows) => {
        console.log("Record added.");
      })
    }
  });

*/

/* This query allows the user to remove a book from their list.

let userBookId = 7;

knex('user_books')
  .where('user_books.id', userBookId)
  .del()
  .then( (rows) => {
    console.log("Record removed.");
  });

*/

/* This query allows the user to update the status of a book on their list.

let userBookId = 10;
let status = 'false'

knex('user_books')
  .where('user_books.id', userBookId)
  .update({ status: status })
  .then((rows) => {
    console.log("Record updated");
  });

*/

/* This query allows a user to search for another user.

let searchString = "Wil";

knex
  .raw(
    'SELECT * ' +
    'FROM users ' +
    'WHERE lower(first_name) like lower(?) ' +
    'OR lower(last_name) like lower(?) ' +
    'OR lower(email) like lower(?);',
    ["%" + searchString + "%", "%" + searchString + "%", "%" + searchString + "%"]
  )
  .then((result) => {
    console.log(result.rows[0].first_name + " " + result.rows[0].last_name);
  });

*/

/* This query adds a connection.

let user1 = 1;
let user2 = 3;

knex('connections')
  .returning('id')
  .insert({ user1_id: user1, user2_id: user2 })
  .then((rows) => {
    console.log("Record added.");
  });

*/

/* This query removes a connection.

let connectionId = 2;

knex('connections')
  .where('connections.id', connectionId)
  .del()
  .then( (rows) => {
    console.log("Record removed.");
  });

*/

/* This query retrieves a list of the user's connections from where the user can borrow books.

let userId = 1;

knex
  .raw(
    'SELECT friends.id ' +
    'FROM ' +
    'users JOIN connections ' +
    'ON users.id = connections.user1_id ' +
    'JOIN users AS friends ' +
    'ON connections.user2_id = friends.id ' +
    'WHERE users.id = ? ' +
    'UNION ' +
    'SELECT friends.id ' +
    'FROM ' +
    'users AS friends JOIN connections ' +
    'ON friends.id = connections.user1_id ' +
    'JOIN users ' +
    'ON connections.user2_id = users.id ' +
    'WHERE users.id = ? ',
    [ userId, userId ]
  )
  .then((result) => {
    console.log(result.rows);
  });
  
*/