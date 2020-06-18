const router = require("express").Router();

let Customer = require("../models/customerModel");

router.get("/", (req, res) => {
  Customer.find()
    .then((customers) => res.json(customers))
    .catch((err) => res.status(400).json("Error in GET customers: " + err));
});

router.get("/:custUsername", (req, res) => {
  Customer.findOne({ username: req.params.custUsername })
    .then((customer) => res.json(customer))
    .catch((err) =>
      res.status(400).json("Error in GET customer by id: " + err)
    );
});

router.post("/", (req, res) => {
  Customer.create(req.body)
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => res.status(400).json("Error in POST customer: " + err));
});

router.put("/:custUsername", (req, res) => {
  Customer.findOneAndUpdate({ username: req.params.custUsername }, req.body)
    .then(() => res.json("customer updated"))
    .catch((err) =>
      res.status(400).json("Error in PUT customer by id: " + err)
    );
});

router.delete("/:custUsername", (req, res) => {
  Customer.findOneAndDelete({ username: req.params.custUsername })
    .then(() => res.json("Customer deleted"))
    .catch((err) =>
      res.status(400).json("Error in DELETE customer by id: " + err)
    );
});

module.exports = router;
