var socket = io.connect(location.origin);

socket.on("draw", function(data) {

	draw(data.x, data.y);
	console.log(data);

});