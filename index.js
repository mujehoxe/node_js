const express = require("express");
const fs = require("fs");

const server = express();

server.listen(3000, () => {
  console.log("Server started on port: 3000");
});

const products = [
  {
    id: 1,
    name: "chambra",
  },
  {
    id: 2,
    name: "shampoo",
  },
];

server.get("/", (req, res) => {
  fs.readFile("index.html", "utf8", (err, html) => {
    fs.readFile("data.txt", "utf8", (err, data) => {
      console.log(data);
      res.send(html + data);
    });
  });
});

server.get("/product", (req, res) => {
  res.send(products[req.query.id - 1]);
});

server.get("/products", (req, res) => {
  res.send(products);
});

server.get("/employees", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    res.contentType("application/json");
    res.send(data);
  });
});
