const router = require("express").Router();

let Employee = require("../models/employeeModel");

router.get("/", (req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error in GET employees: " + err));
});

router.get("/:emplUsername", (req, res) => {
  Employee.findOne({ username: req.params.emplUsername })
    .then((employee) => res.json(employee))
    .catch((err) =>
      res.status(400).json("Error in GET employee by id: " + err)
    );
});

router.post("/", (req, res) => {
  Employee.create(req.body)
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => res.status(400).json("Error in POST employee: " + err));
});

router.put("/:emplUsername", (req, res) => {
  Employee.findOneAndUpdate({ username: req.params.emplUsername }, req.body)
    .then(() => res.json("employee updated"))
    .catch((err) =>
      res.status(400).json("Error in PUT employee by id: " + err)
    );
});

router.delete("/:emplUsername", (req, res) => {
  Employee.findOneAndDelete({ username: req.params.emplUsername })
    .then(() => res.json("employee deleted"))
    .catch((err) =>
      res.status(400).json("Error in DELETE employee by id: " + err)
    );
});

module.exports = router;
