const express = require("express");
const bodyparser = require("body-parser");
const qr = require("qr-image");
const fs = require("fs");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const t = req.body.scan;
  console.log(t);
  var qr_svg = qr.image(t);
  qr_svg.pipe(fs.createWriteStream("img.png"));
  res.sendFile(__dirname + "/img.png");
});

app.listen(3000, function () {
  console.log("Server ported successfully on port 3000");
});
app.use(express.static("public"));
