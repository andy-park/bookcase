var PORT = process.env.PORT || 8080; // default port 8080

var express = require("express");
// const methodOverride = require('method-override');
// const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

var app = express();
app.set ('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('assets'))

app.locals.thumbnail = 1;
app.locals.title = 2;
app.locals.author = 3;

//Sample endpoint
app.get("/", (req, res) => {
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