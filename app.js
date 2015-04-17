var express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server);

var ect = require("ect")({
	watch: true,
	root: __dirname + "/views",
	ext: ".ect"
});

var config = {
	minBlockSize: 5,
	maxBlockSize: 25
};

config.json = JSON.stringify(config);

app.set("view engine", "ect");
app.engine("ect", ect.render);

app.use(express.static("static"));
app.use(express.static("bower_components"));

app.get("/", function(req, res) {
	res.render("index", config);
});

var users = 0;

io.on("connection", function(socket) {

	users++;

	io.emit("users", users);

	socket.on("disconnect", function() {
		users = users - 1;

		socket.broadcast.emit("users", users);
	});

	socket.on("draw", function(data) {
		if(data.x < 1000000 && data.y < 1000000) {
			if(data.size <= config.maxBlockSize && data.size >= config.minBlockSize) {
				socket.broadcast.emit("draw", {
					x: parseInt(data.x), 
					y: parseInt(data.y),
					size: parseInt(data.size)
				});
			}
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
console.log("liveblocks running on " + port);