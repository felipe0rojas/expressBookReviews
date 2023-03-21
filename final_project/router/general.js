const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Please, provide a valid email and password" });
});


// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  // res.send(JSON.stringify(books));
  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(res.send(books))
      } catch (err) {
        reject(err)
      }
    }, 5000)
  })

  bookPromise.then((successMessage) => {
    console.log("Book list retrieved successfully")
  });

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  // res.send(JSON.stringify(books[isbn]));

  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(res.send(books[isbn]))
      } catch (err) {
        reject(err)
      }
    }, 5000)
  })

  bookPromise.then((successMessage) => {
    console.log("Book list retrieved successfully")
  });

});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author;
  let filtered_books = (Object.entries(books)).filter((book) => book[1].author === author);
  // res.send(JSON.stringify(filtered_books));

  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(res.send(filtered_books))
      } catch (err) {
        reject(err)
      }
    }, 5000)
  })

  bookPromise.then((successMessage) => {
    console.log("Book list retrieved successfully")
  });

});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filtered_titles = (Object.entries(books)).filter((book) => book[1].title === title);
  // res.send(JSON.stringify(filtered_titles));

  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(res.send(filtered_titles))
      } catch (err) {
        reject(err)
      }
    }, 5000)
  })

  bookPromise.then((successMessage) => {
    console.log("Book list retrieved successfully")
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let filtered_reviews = (Object.entries(books)).filter((book) => book[0] === isbn);
  // res.send(JSON.stringify(filtered_reviews[0][1].reviews));

  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(res.send(filtered_reviews[0][1].reviews))
      } catch (err) {
        reject(err)
      }
    }, 5000)
  })

  bookPromise.then((successMessage) => {
    console.log("Book reviews retrieved successfully")
  });

});

module.exports.general = public_users;
