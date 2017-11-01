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

    console.log(book_id);

    res.locals.title = title;
    res.locals.author = author;
    res.locals.thumbnail = thumbnail;
    res.locals.book_id = book_id;

    // This query takes a list of books and finds which connections have the books available to borrow

    let userId = 1;
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
      .where('isbn', book_id[0])
      .andWhere('status', 'true')
      .then((rows) => {
        lenders[0] = {};
        connections.forEach((connection) => {
          rows.forEach((row) => {
            if(connection == row.id) {
              lenders[0] = row;
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
        .where('isbn', book_id[1])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[1] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[1] = row;
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
        .where('isbn', book_id[2])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[2] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[2] = row;
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
        .where('isbn', book_id[3])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[3] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[3] = row;
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
        .where('isbn', book_id[4])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[4] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[4] = row;
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
        .where('isbn', book_id[5])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[5] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[5] = row;
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
        .where('isbn', book_id[6])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[6] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[6] = row;
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
        .where('isbn', book_id[7])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[7] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[7] = row;
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
        .where('isbn', book_id[8])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[8] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[8] = row;
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
        .where('isbn', book_id[9])
        .andWhere('status', 'true')
        .then((rows) => {
          lenders[9] = {};
          connections.forEach((connection) => {
            rows.forEach((row) => {
              if(connection == row.id) {
                lenders[9] = row;
              } 
            })
          })
          //console.log(lenders);
          for(var i = 0; i < 10; i++) {
            if(lenders[i] == undefined) {
              lenders[i] = {};
            }
          }
          
          res.locals.lenders = lenders;
          return res.render("index_show")
        })
      })

      })
    });
    //end of query
    
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
      let connectionIds = [];
      result.rows.forEach((result, index) => {
        connectionIds[index] = result.id;
      })
      knex
        .select()
        .from('users')
        .whereIn('users.id', connectionIds)
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
      knex('users')
        .where('users.id', user2)
        .then((userData) => {
          res.send(JSON.stringify(userData));
        });

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
  const bookId = req.body.userBookId;
  const status = req.body.status;
  console.log("STATUS: " + status);
  console.log("USER_BOOK: " + bookId);
  knex('user_books')
    .where('user_books.book_id', bookId).andWhere('user_books.user_id', 1)
    .update({
      status: status
    })
    .then((rows) => {
      console.log("Record updated");
      res.send("OK");
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
          book.picture = "/public/assets/image-not-found.gif";
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

const nodemailer = require("nodemailer");

app.post("/email", (req, res) => {
  console.log(req.body.user);
  knex
    .select()
    .from('users')
    .where('users.id', req.body.user)
    .then((result) => {
      //console.log(result);
      let firstName = result[0].first_name;
      let lastName = result[0].last_name;
      let email = result[0].email;
      
      knex
        .select()
        .from('books')
        .where('books.isbn', req.body.book)
        .then((result) => {
          let bookName = result[0].title;
          nodemailer.createTestAccount((error, account) =>  {
            let transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false,
              auth: {
                user: account.user,
                pass: account.pass
              }
            });
            let mailOptions = {
              from: "homer.simpson@simpsons.com",
              to: email,
              subject: "Book Request",
              text: "Hi " + firstName + ", \n\nMay I borrow your copy of " + bookName + "?" + "\n\n Thanks, \n\nHomer"
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if(error) {
                return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            })
          })
          
        })
      
  
    });

  
});