const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const url = "mongodb+srv://bardi:12345@cluster0-i26xd.azure.mongodb.net/customerService?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully");
});
mongoose.set("useFindAndModify", false);


app.use("/customers", require("./routes/customerRouter"));
app.use("/salespeople", require("./routes/salespersonRouter"));
app.use("/employees", require("./routes/employeeRouter"));
app.use("/products", require("./routes/productRouter"));
app.use("/buys", require("./routes/buyRouter"));
app.use("/reports", require("./routes/reportRouter"));


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
