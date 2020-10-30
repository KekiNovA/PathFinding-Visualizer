var express = require('express');
var path = require('path');
var app = express();
var port = "3000";

app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.set('port', port);

module.exports = app;