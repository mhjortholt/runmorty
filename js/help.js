function random(start, end) {
	return Math.floor( Math.random() * (end-start) ) + start;
}

function normRad(a) {
	while(a < 0) {
		a += Math.PI*2;
	}
	return a % (Math.PI * 2);
}

function diffAngle(v1, v2) {
	var a = Math.abs(normRad(v1) - normRad(v2));
	return a > Math.PI ? (2 * Math.PI) - a : a;
}

function log(s) {
	if(LOGGING) {
		console.log(s);
	}
}