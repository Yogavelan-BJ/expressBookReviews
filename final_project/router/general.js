const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Fields Should Not Be Empty" });
  }
  for (let i of users) {
    if (i.username === username) {
      return res.status(400).json({ message: "User Already Exists" });
    }
  }
  users.push({ username, password });
  return res.status(200).json({ message: "User added successfully" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const { isbn } = req.params;
  let filteredByISBN = {};
  const arr = Object.keys(books);
  for (let i of arr) {
    if (books[i]["ISBN"] == isbn) {
      filteredByISBN[i] = books[i];
    }
  }
  return res.status(200).json({ filteredByISBN });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const { author } = req.params;
  let filteredByAuthor = {};
  const arr = Object.keys(books);
  for (let i of arr) {
    if (books[i]["author"] === author) {
      filteredByAuthor[i] = books[i];
    }
  }
  return res.status(200).json({ filteredByAuthor });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const { title } = req.params;
  let filteredByTitle = {};
  const arr = Object.keys(books);
  for (let i of arr) {
    if (books[i]["title"] === title) {
      filteredByTitle[i] = books[i];
    }
  }
  return res.status(200).json({ filteredByTitle });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const { isbn } = req.params;
  let Reviews = {};
  const arr = Object.keys(books);
  for (let i of arr) {
    if (books[i]["ISBN"] == isbn) {
      Reviews[i] = books[i]["reviews"];
    }
  }
  return res.status(200).json({ Reviews });
});

module.exports.general = public_users;
