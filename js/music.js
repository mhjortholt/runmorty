let musicPlayer = new (function() {

	var audio = new Audio('./sound/intro.m4a');
	audio.loop = true;
	audio.volume = 0.1;

	this.play = function() {
		if(audio.paused && SOUND) {
			audio.play();
		}
	};

	this.stop = function() {
		audio.pause();
	}

})();

let sounds = new (function() {

	var portal = new Audio();
	var portal2 = new Audio();
	var klick = new Audio();
	var glass = new Audio();
	var bubble = new Audio();

	this.init = function() {
		portal.play();
		portal2.play();
		klick.play(); klick.volume = 0.4;
		glass.play(); glass.volume = 0.7;
		bubble.play();
	};

	this.portal = function() {
		if(SOUND) {
			portal2.src = './sound/portal.m4a';
			portal2.currentTime = 0;
			portal2.play();
		}
	};
	this.teleport = function() {
		if(SOUND) {
			portal2.src = './sound/portal2.m4a';
			portal.currentTime = 0;
			portal.play();
		}
	};
	this.klick = function() {
		if(SOUND) {
			klick.src = './sound/klick.wav';
			klick.currentTime = 0;
			klick.play();
		}
	};
	this.bubble = function() {
		if(SOUND) {
			bubble.src = './sound/bubble.wav';
			bubble.currentTime = 0;
			bubble.play();
		}
	};
	this.glass = function() {
		if(SOUND) {
			glass.src = './sound/glass.wav';
			glass.currentTime = 0;
			glass.play();
		}
	};

})();