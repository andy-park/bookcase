require("dotenv").load();
var PORT = process.env.PORT || 8080; // default port 8080

var express = require("express");
// const methodOverride = require('method-override');
// const bcrypt = require('bcrypt');
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
app.set ('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.locals.thumbnail = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
app.locals.title = "Title";
app.locals.author = "Author";

// ENDPOINTS
app.get("/", (req, res) => {
  
  // This query retrieves a list of bestsellers.
  knex('books')
    .where('books.bestseller', 'true')
    .then((rows) => {
      for (var i = 0; i < 9; i++) {
        console.log(rows[i].title);
        console.log(rows[i].author);
        console.log(rows[i].picture);
      };
    });

  res.render("index")
});

app.get("/connections", (req, res) => {
  res.render("connections")
});

app.get("/books", (req, res) => {
  res.render("user_books")
});

//Listening to the appropriate PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});