var express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server);

app.use(express.static("public"));
app.use(express.static("bower_components"));

io.on("connection", function(socket) {

	socket.on("draw", function(data) {
		if(data.x.length < 5 && data.y.length < 5) {
			socket.broadcast.emit("draw", {
				x: parseInt(data.x), 
				y: parseInt(data.y)
			});
		}
	});

});

server.listen(3000);