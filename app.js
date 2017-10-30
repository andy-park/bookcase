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
      res.locals.titles = titles;
      res.locals.authors = authors;
      res.locals.thumbnails = thumbnails;
      res.render("index")
    });
});

app.post("/books", (req, res) => {
  const input = req.body.input;
  let title = [];
  let author = [];
  let thumbnail = [];
  let book_id = [];

  searchBooks(input, (books) => {
    for (var i = 0; i < books.length; i++) {
      title[i] = books[i].title;
      author[i] = books[i].authors;
      thumbnail[i] = books[i].picture;
      book_id[i] = books[i].isbn;
    };
    res.locals.title = title;
    res.locals.author = author;
    res.locals.thumbnail = thumbnail;
    res.locals.book_id = book_id;

    return res.render("index_show")
  })
});


app.get("/connections", (req, res) => {
  //This query retrieves a list of the user's connections from where the user can borrow books.
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
      'WHERE users.id = ? ', [userId, userId]
    )
    .then((result) => {
      result.rows.forEach((row) => {
        knex
          .select()
          .from('users')
          .where('users.id', row.id)
          .then((user) => {
            let first = [];
            let last = [];
            let email = [];
            let userId = [];

            for (var i = 0; i < user.length; i++) {
              first[i] = user[i].first_name;
              last[i] = user[i].last_name;
              email[i] = user[i].email;
              userId[i] = user[i].id;
            };
            res.locals.first = first;
            res.locals.last = last;
            res.locals.email = email;
            res.locals.userId = userId;
            res.render("connections")
          })
      });
    });
});

app.get("/connections/search", (req, res) => {
  console.log(req.query.input);
//This query allows a user to search for another user.

  let searchString = req.query.input;

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
      
      res.send(JSON.stringify(result.rows));
    });

});

app.post("/connections/delete", (req, res) => {
// This query removes a connection. 
  const user = req.body.user;

  knex('connections')
    .where('connections.user2_id', user)
    .del()
    .then( (rows) => {
      console.log("Record removed.");
  });
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
      let userId = [];
      let bookId = [];

      for (var i = 0; i < rows.length; i++) {
        title_loan[i] = rows[i].title;
        author_loan[i] = rows[i].author;
        status[i] = rows[i].status;
        userId[i] = rows[i].user_id;
        bookId[i] = rows[i].book_id;
      };
      res.locals.title_loan = title_loan;
      res.locals.author_loan = author_loan;
      res.locals.status = status;
      res.locals.userId = userId;
      res.locals.bookId = bookId;
      res.render("user_books")
    })
});

app.post("/library/status", (req, res) => {
//This query allows the user to update the status of a book on their list.
  const userBookId = req.body.userBookId;
  const status = req.body.status;
 
  knex('user_books')
    .where('user_books.id', userBookId)
    .update({
      status: status
    })
    .then((rows) => {
      console.log("Record updated");
    });
});

app.post("/library/delete", (req, res) => {
  //This query allows the user to remove a book from their list.
  const bookId = req.body.bookId;
  const userId = req.body.userId;

  knex('user_books')
    .where('user_books.book_id', bookId)
    .andWhere('user_books.user_id', userId)
    .del()
    .then((rows) => {});
  console.log("Record removed.");
});


// app.post("/library", (req, res) => {
// //This query allows the user to add a book to their list.
//   let isbn = "9781449462260"; // This item is in the books table.
//   const isbn2 = req.body.input; // This item will be added to the books table.
//   let title = "Big Nate I Can't Take It";
//   let author = "Lincoln Peirce";
//   let user_id = 1;

//   knex
//     .column('id')
//     .from('books')
//     .where('isbn', isbn2)
//     .then((rows) => {
//       if (rows.length === 0) {
//         console.log("ISBN not found in books table.");
//         knex('books')
//           .returning('id')
//           .insert({
//             isbn: isbn2,
//             title: title,
//             author: author
//           })
//           .then((rows) => {
//             knex('user_books')
//               .returning('id')
//               .insert({
//                 user_id: user_id,
//                 book_id: rows[0],
//                 status: 'true'
//               })
//               .then((rows) => {
//                 console.log("Record added.");
//               })
//           })
//       } else {
//         console.log("ISBN found in books table.");
//         knex('user_books')
//           .returning('id')
//           .insert({
//             user_id: user_id,
//             book_id: rows[0].id,
//             status: 'true'
//           })
//           .then((rows) => {
//             console.log("Record added.");
//           })
//       }
//     });
//   });

//Listening to the appropriate PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

function searchBooks(title, cb) {

  title = urlEncode(title);
  let url = "https://www.googleapis.com/books/v1/volumes" + "?q=" + title + "&key=" + process.env.GOOGLE_BOOKS_API

  const callback = function (error, response, body) {
    let result = JSON.parse(body);
    if (result.error == undefined && result.items.length != 0) {
      books = [];
      result.items.forEach((item) => {
        book = {};
        book.title = item.volumeInfo.title;
        if (item.volumeInfo.authors != undefined) {
          book.authors = item.volumeInfo.authors;
        } else {
          book.authors = ["Unknown"];
        }
        if (item.volumeInfo.industryIdentifiers != undefined) {
          item.volumeInfo.industryIdentifiers.forEach((identifier) => {
            if (identifier.type == "ISBN_13") {
              book.isbn = identifier.identifier
            }
          });
          if (book.isbn == undefined) {
            book.isbn = "";
          }
        } else {
          book.isbn = "";
        }
        if (item.volumeInfo.imageLinks != undefined) {
          book.picture = item.volumeInfo.imageLinks.smallThumbnail;
        } else {
          book.picture = "./public/assets/Image-not-found.gif";
        }
        books.push(book);
      })
      cb(books);
    }
    return;
  }
  request(url, callback);
}

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

const amazon = require('amazon-product-api');

function searchBookForSale(isbn, cb) {
  var client = amazon.createClient({
    awsId: process.env.AMAZON_API,
    awsSecret: process.env.AMAZON_SECRET,
    awsTag: process.env.AMAZON_ASSOCIATE
  });

  client.itemLookup({
    domain: 'webservices.amazon.ca',
    idType: 'ISBN',
    itemId: isbn
  }, function (err, results, response) {
    if (err) {
      console.log(err.Error);
    } else {
      let amazonProductPageURL = results[0].DetailPageURL[0];
      cb(amazonProductPageURL);
    }
  });
};