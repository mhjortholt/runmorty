let musicPlayer = new (function() {

	var audio = new Audio('./sound/intro.m4a');
	audio.loop = true;

	this.play = function() {
		if(audio.paused && SOUND) {
			audio.play();
		}
	};

	this.stop = function() {
		audio.pause();
	}

})();