var canvas, ctx;

$(document).ready(function() {

	canvas = $("canvas")[0];
	canvas.width = $(window).width();
	canvas.height = $(window).height();

	ctx = canvas.getContext("2d");

	$(canvas).click(function(event) {
		var x = event.pageX - 10;
		var y = event.pageY - 10;

		draw(x, y);
		socket.emit("draw", {x: x, y: y});
	});
});	

function draw(x, y) {
	var colors = ["#1abc9c", "#2980b9", "#2c3e50", "#f1c40f", "#e74c3c", "#f39c12", "#9b59b6"];

	ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
	ctx.fillRect(x, y, 20, 20);
}