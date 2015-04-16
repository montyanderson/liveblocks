var express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server);

app.use(express.static("public"));
app.use(express.static("bower_components"));

server.listen(3000);