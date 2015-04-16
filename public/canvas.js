var canvas, ctx;

$(document).ready(function() {

	canvas = $("canvas")[0];
	canvas.width = $(window).width();
	canvas.height = $(window).height();

	ctx = canvas.getContext("2d");

	$(canvas).click(function(event) {
		draw(event.pageX, event.pageY);
		socket.emit("draw", {x: event.pageX, y: event.pageY});
	});
});	

function draw(x, y) {
	var colors = ["#1abc9c", "#2980b9", "#2c3e50", "#f1c40f", "#e74c3c", "#f39c12", "#9b59b6"];

	ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
	ctx.fillRect(x, y, 20, 20);
}