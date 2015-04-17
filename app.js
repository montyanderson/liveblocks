var express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server);

app.use(express.static("public"));
app.use(express.static("bower_components"));

io.on("connection", function(socket) {

	socket.on("draw", function(data) {
		if(data.x < 1000000 && data.y < 1000000) {
			socket.broadcast.emit("draw", {
				x: parseInt(data.x), 
				y: parseInt(data.y)
			});
		}
	});

});

var port;

if(process.argv[2]) {
	port = process.argv[2];
} else {
	port = 3000;
}

server.listen(port);
console.log("realtime-blocks running on " + port);