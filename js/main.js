var canvas, ctx, background, background_ctx;
window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	background = document.getElementById('background');
	background_ctx = background.getContext('2d');

	resize();

	document.getElementById('start_btn').style.display = 'block';

	if(AUTO_START) {
		startGame();
	}
};

function resize() {
	let width = window.innerWidth;
	let height = window.innerHeight;
	var container = document.getElementById('canvas_container');
	container.style.width = width + 'px';
	container.style.height = height + 20 + 'px';
	canvas.width = width;
	canvas.height = 10 + height;

	background.width = width;
	background.height = 10 + height;

	window.innerHeight = height + 15;
}

window.addEventListener('orientationchange', function() {
	setTimeout(resize, 50);
}, false);


function startGame() {
	document.getElementById('logo').style.display = 'none';
	musicPlayer.play();
	start();
}