const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  let accessToken = jwt.sign(
    {
      data: username,
    },
    "access",
    { expiresIn: 60 * 2 }
  );

  // Store access token and username in session
  req.session.authorization = {
    accessToken,
    username,
  };
  return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.post("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const arr = Object.keys(books);
  let username = req.session.authorization.username;
  for (let i of arr) {
    if (books[i]["ISBN"] == isbn) {
      books[i]["reviews"][username] = review;
    }
  }
  return res.status(200).send("Review Added");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
