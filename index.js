const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});
const routes = require("./routes")(app);
app.listen(3000);
