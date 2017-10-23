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
app.use(express.static('public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.locals.thumbnail = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
app.locals.title = "Title";
app.locals.author = "Author";

//Sample endpoint
app.get("/", (req, res) => {
  res.render("index")
});

//Listening to the appropriate PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});