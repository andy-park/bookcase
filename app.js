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

    // This query takes a list of books and finds which connections have the books available to borrow

    let userId = 1;
    let isbns = ["9780545057042", "1234567890123", "9780545057042", "1234567890123", "9780545057042", "1234567890123", "9780545057042", "1234567890123", "9780545057042", "1234567890123"];
    let lenders = [];

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
      connections = [];
      result.rows.forEach((row, index) => {
        connections[index] = row.id;
      });
      knex
      .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
      .from('books')
      .innerJoin('user_books', 'books.id', 'user_books.book_id')
      .innerJoin('users', 'user_books.user_id', 'users.id')
      .where('isbn', isbns[0])
      .andWhere('status', 'true')
      .then((rows) => {
        lenders[0] = [];
        connections.forEach((connection) => {
          rows.forEach((row) => {
            if(connection == row.id) {
              lenders[0].push(row);
            } 
          })
        })
        //console.log(lenders[0]);
      })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[1])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[1] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[1].push(row);
              } 
            })
          })
          //console.log(lenders[1]);
        })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[2])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[2] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[2].push(row);
              } 
            })
          })
          //console.log(lenders[2]);
        })
      })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[3])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[3] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[3].push(row);
              } 
            })
          })
          //console.log(lenders[3]);
        })
      })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[4])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[4] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[4].push(row);
              } 
            })
          })
          //console.log(lenders[4]);
        })
      })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[5])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[5] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[5].push(row);
              } 
            })
          })
          //console.log(lenders[5]);
        })
      })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[6])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[6] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[6].push(row);
              } 
            })
          })
          //console.log(lenders[6]);
        })
      })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[7])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[7] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[7].push(row);
              } 
            })
          })
          //console.log(lenders[7]);
        })
      })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[8])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[8] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[8].push(row);
              } 
            })
          })
          //console.log(lenders[8]);
        })
      })
      .then(() => {
        knex
        .column('users.id', 'users.email', 'users.first_name', 'users.last_name')
        .from('books')
        .innerJoin('user_books', 'books.id', 'user_books.book_id')
        .innerJoin('users', 'user_books.user_id', 'users.id')
        .where('isbn', isbns[9])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[9] = [];
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[9].push(row);
              } 
            })
          })
          console.log(lenders);
        })
      })

      })
    });

    //end of query




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

app.get("/connections/add", (req, res) => {
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
            
            console.log(user);

            // let first = [];
            // let last = [];
            // let email = [];
            // let userId = [];

            // for (var i = 0; i < user.length; i++) {
            //   first[i] = user[i].first_name;
            //   last[i] = user[i].last_name;
            //   email[i] = user[i].email;
            //   userId[i] = user[i].id;
            // };
            
            res.send("TEST");

          })
      });
    });
})

app.post("/connections/add", (req, res) => {
  //This query adds a connection.
  let user1 = req.body.myId;
  let user2 = req.body.friendId;

  knex('connections')
    .returning('id')
    .insert({ user1_id: user1, user2_id: user2 })
    .then((rows) => {
      console.log("Record added.");
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
    .then((rows) => {
      console.log("Record removed.");
    });
});

app.post("/library", (req, res) => {
//This query allows the user to add a book to their list.
  let isbn = req.body.bookNum; 
  let user_id = 1;
  let bookData = {};

  searchBooks(isbn, (books) => {
    books.forEach((book) => {
      if(book.isbn == isbn) {
        console.log("FOUND BOOK");
        console.log(book)
        bookData.isbn = book.isbn;
        if(book.title) {
          bookData.title = book.title;
        } else {
          bookData.title = "Unknown";
        }
        if(book.authors) {
          bookData.author = book.authors[0];
        } else {
          bookData.author = "Unknown";
        }
      }
    })
    //console.log(bookData);
    //res.send(JSON.stringify(bookData));
    knex
    .column('id')
    .from('books')
    .where('isbn', isbn)
    .then((rows) => {
      if (rows.length === 0) {
        console.log("ISBN not found in books table.");
        knex('books')
          .returning('id')
          .insert({
            isbn: bookData.isbn,
            title: bookData.title,
            author: bookData.author
          })
          .then((rows) => {
            knex('user_books')
              .returning('book_id')
              .insert({
                user_id: user_id,
                book_id: rows[0],
                status: 'true'
              })
              .then((rows) => {
                bookData.bookId = rows[0];
                console.log("Record added.");
                res.send(JSON.stringify(bookData));
              })
          })
      } else {
        console.log("ISBN found in books table.");
        knex('user_books')
          .returning('book_id')
          .insert({
            user_id: user_id,
            book_id: rows[0].id,
            status: 'true'
          })
          .then((rows) => {
            bookData.bookId = rows[0];
            console.log("Record added.");
            res.send(JSON.stringify(bookData));
          })
      }
    });



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