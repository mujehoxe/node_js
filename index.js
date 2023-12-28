const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.listen(3000, () => {
  console.log("Server started on port: 3000");
});

server.get("/", (req, res) => {
  fs.readFile("index.html", "utf8", (err, html) => {
    fs.readFile("data.txt", "utf8", (err, data) => {
      res.send(html + data);
    });
  });
});

server.get("/product", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    res.contentType("application/json");
    res.send(products[req.query.id - 1]);
  });
});

function readProductsAndRespond(res) {
  fs.readFile("products.json", "utf8", (err, data) => {
    res.contentType("application/json");
    res.send(data);
  });
}

server.get("/products", (req, res) => {
  readProductsAndRespond(res);
});

server.post("/products", (req, res) => {
  console.log(req.body);
  const product = { name: req.body["product-name"] };

  fs.readFile("products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);

    if (products[products.length - 1].name === product.name) {
      res.status(401).send("product already exists");
      return;
    }

    product.id = products.length + 1;
    products.push(product);
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
      if (err) console.log("Error writing file:", err);
    });
    res.send(product);
  });
});

server.get("/employees", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    res.contentType("application/json");
    res.send(data);
  });
});
