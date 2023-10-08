var express = require("express");
var app = express();
var router = require("./routes.js");

app.use("/routes", router);

app.listen(3000);
