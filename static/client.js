var socket = io.connect(location.origin);

socket.on("draw", function(data) {

	draw(data);
	console.log(data);

});