var express    = require("express"),
    bodyParser = require("body-parser");

var app = express();

// support json encoded request bodies
app.use(bodyParser.json());
// support encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// init database connection and setup rest routes and functions
var db     = require("./db/db.js"),
    routes = require("./routes/routes.js")(app,db);


var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});