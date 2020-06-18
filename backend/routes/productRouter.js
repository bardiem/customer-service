const router = require("express").Router();

let Product = require("../models/productModel");

router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error in GET products: " + err));
});

router.get("/:pdtId", (req, res) => {
  Product.findById(req.params.pdtId)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error in GET product by id: " + err));
});

router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json("Error in POST product: " + err));
});

router.put("/:pdtId", (req, res) => {
  Product.findByIdAndUpdate(req.params.pdtId, req.body)
    .then(() => res.json("product updated"))
    .catch((err) => res.status(400).json("Error in PUT product by id: " + err));
});

router.delete("/:pdtId", (req, res) => {
  Product.findByIdAndDelete(req.params.pdtId)
    .then(() => res.json("product deleted"))
    .catch((err) =>
      res.status(400).json("Error in DELETE product by id: " + err)
    );
});

module.exports = router;
