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
	ctx.fillRect(x, y, 20, 20);
	socket.emit("draw", {x: x, y: y});
}