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

	var portal = new Audio('./sound/portal.mp4');
	portal.volume = 0.5;
	var portal2 = new Audio('./sound/portal2.mp4');

	this.portal = function() {
		if(SOUND) {
			portal2.play();
		}
	};

})();