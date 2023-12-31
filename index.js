var express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

var currencyRouter = require("./routes/currency.routes");

require("dotenv").config();

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello crypto dev..!!");
});

app.use("/currency", currencyRouter);

app.listen(PORT, (err) => {
  console.log(`Server listening at port : ` + PORT);
});
