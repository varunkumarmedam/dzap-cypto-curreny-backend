var express = require("express");
const bodyParser = require("body-parser");
const PORT = 8080;
const cors = require('cors');

var currencyRouter = require("./routes/currency.routes");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello crypto dev..!!");
});

app.use("/coins", currencyRouter);

app.listen(PORT, (err) => {
  console.log(`Server listening at port : ` + PORT);
});
