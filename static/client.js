var canvas, ctx, ready = false;

$(document).ready(function() {

	canvas = $("canvas")[0];
	canvas.width = ($(window).width() - 20);
	canvas.height = ($(window).height() - 20);

	ctx = canvas.getContext("2d");

	$(canvas).click(function(event) {
		var size = $("#block-size")[0].value;

		var x = event.pageX - (size / 2);
		var y = event.pageY - (size / 2);

		var data = {x: x, y: y, size: size};

		draw(data);
		socket.emit("draw", data);
	});

	$("#clear").click(function() {
		location.reload();
	});

	ready = true;

});	

function draw(data) {
	var colors = ["#1abc9c", "#2980b9", "#2c3e50", "#f1c40f", "#e74c3c", "#f39c12", "#9b59b6"];

	ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
	ctx.fillRect(data.x, data.y, data.size, data.size);
}

var socket = io.connect(location.origin);

socket.on("users", function(users) {
	if(ready == true) {
		$("#users").text(users);
	} else {
		$(document).ready(function() {
			$("#users").text(users);
		});
	}
});

socket.on("draw", function(data) {
	if(ready == true) {
	 	draw(data);
		console.log(data);
	}
});