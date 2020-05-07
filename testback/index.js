const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {         //this is known as a callback that is a function without any name
  return res.send("Home page");
});

const admin = (req, res) => {             
  return res.send("this is admin dashboard");
};

const isAdmin = (req, res, next) => {
  console.log("isAdmin is running");  //isAdmin is a middleware which is like a blackbox and its a customizable one as it has the next() method  
  next();
};

// Note this entire isAdmin and admin acts like a function
app.get("/admin", isAdmin, admin);

app.get("/login", (req, res) => {
  return res.send("You are visiting login route");
});

app.get("/signup", (req, res) => {
  return res.send("You are visiting signup route");
});

app.listen(port, () => {
  console.log("Server is up and running...");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
