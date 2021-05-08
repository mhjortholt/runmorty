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

	var portal = new Audio('./sound/portal.m4a');
	var portal2 = new Audio('./sound/portal2.m4a');
	var klick = new Audio('./sound/klick.wav'); klick.volume = 0.4;
	var glass = new Audio('./sound/glass.wav'); glass.volume = 0.7;
	var bubble = new Audio('./sound/bubble.wav');


	this.portal = function() {
		if(SOUND) {
			portal2.currentTime = 0;
			portal2.play();
		}
	};
	this.teleport = function() {
		if(SOUND) {
			portal.currentTime = 0;
			portal.play();
		}
	};
	this.klick = function() {
		if(SOUND) {
			klick.currentTime = 0;
			klick.play();
		}
	};
	this.bubble = function() {
		if(SOUND) {
			bubble.currentTime = 0;
			bubble.play();
		}
	};
	this.glass = function() {
		if(SOUND) {
			glass.currentTime = 0;
			glass.play();
		}
	};

})();