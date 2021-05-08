var gameInterval, score;
function start() {
	log('Start');
	score = 0;
	addScore(0);

	//background
	changeBackground();

	gameLoop();
}

let backgrounds = [
	background_01, background_02, background_03, background_04, background_05,
	background_06, background_07, background_08, background_09,
	background_11, background_12, background_14
];
function changeBackground() {
	background_ctx.clearRect(0, 0, background.width, background.height);
	background_ctx.beginPath();
	background_ctx.imageSmoothingEnabled = false;
	
	let bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	background_ctx.drawImage(bg, 0, 0, bg.width * scale, bg.height * scale);
}

function checkInput() {
	if(keys[32] || action['jump']) {
		jump();
	} else {
		jumpPower = 10;
	}
	if(keys[13] || keys[75]) {
		stop();
	}

	if (!keys[77]) {
		shooting = false;
	}
	if(keys[77] && !shooting) {
		shoot();
		shooting = true;
	}
}

let id;
let stopped = false;
function gameLoop() {

	// Update score	
	addScore(1);

	// Check input
	checkInput();

	// Update shixt
	updateMorty();
	updateWorld();
	detectCollisions();

	// Cleanup
	clearStuff();

	// draw shixt
	clear();
	drawWorld();
	drawMorty();
	drawForeground();

	//drawShixt();
	if(!stopped) {
		id = window.requestAnimationFrame(gameLoop);
	}

	if (SHOW_FPS) showFps();
}

let morty = new Player({
	x: 160, 
	y: 24,
	dy: 0,
	width: 20,
	height: 112
});
morty.addHitbox('feet', { x: 10, y: 112, width: 40, height: 5 });
morty.addHitbox('front',{ x: 45, y: 10, width: 5, height: 90 });


let gravity = 0.45;
let jumpSpeed = 7;
function updateMorty() {
	// apply gravity
	morty.dy += gravity;

	morty.y += morty.dy;
	
}

let jumpPower = 10;
function jump() {
	if (onGround()) {
		log('Jump');
		morty.dy = -jumpSpeed;
		jumpPower = 0;
	} else if(jumpPower < 10) {
		morty.dy = -jumpSpeed;
		jumpPower++;
	}
}

function onGround() {// TODO
	let tiles = world.getTiles();
	for(let i = 0; i < tiles.length; i++) {
		let tile = tiles[i];
		if(touches(morty.getHitbox('feet'), tile)) return true;
	}
	return false;
}

let portals = [{x: 30, y: 0}];
let gun = {
	ammo: 0
}
function shoot() {
	if(gun.ammo > 0) {
		log('Creating portal');
		sounds.portal();
		portals.push({
			x: 600,
			y: morty.y - 50
		});
		gun.ammo--;
		updateGunImage();
	}
}


let world = new World();

function touches(rect1, rect2) {
	if (rect1.x < rect2.x + rect2.width &&
   		rect1.x + rect1.width > rect2.x &&
   		rect1.y < rect2.y + rect2.height &&
   		rect1.y + rect1.height > rect2.y) {
    	return true;
	}
	return false;
}

function drawShixt() {
	//log('Drawing shixt');

	ctx.beginPath();
	ctx.fillStyle = '#f00';
	let hit = morty.getHitbox('feet');
	ctx.rect( hit.x, hit.y, hit.width, hit.height);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = '#f00';
	hit = morty.getHitbox('front');
	ctx.rect( hit.x, hit.y, hit.width, hit.height);
	ctx.fill();


}

function detectCollisions() {
	let tiles = world.getTiles();

	for(let i = 0; i < tiles.length; i++) {
		let tile = tiles[i];
		if(touches(morty.getHitbox('feet'), tile)) { // under ground

			if(touches(morty.getHitbox('front'), tile)) { // hit a wall
				die('Hit a wall');
				return;
			}
			
			// land
			morty.y = tile.y-morty.height;
			morty.dy = 0;
		}
	}

	if (touches(morty.getHitbox('feet'), { x:0, y: 360, width: 300, height: 300 })) { // lava
		die('Lava');
		return;
	}

	portals.forEach((portal) => {
		if (touches(morty.getHitbox('front'), { x: portal.x + 72, y: portal.y + 72, width: 48, height: 48 })) {
			teleport(portal);
			return;
		}
	});

	world.getFluids().forEach((fluid) => {
		if(fluid.visible && touches(morty.getHitbox('front'), fluid)) {
			fluid.visible = false;
			log('Picked up fluid');
			gun.ammo++;
			updateGunImage();
		}
	});
}

function updateGunImage() {
	if(gun.ammo > 0) {
		document.getElementById('empty').style.display = 'none';
		document.getElementById('loaded').style.display = 'block';
	} else {
		document.getElementById('empty').style.display = 'block';
		document.getElementById('loaded').style.display = 'none';
	}
}

function stop() {
	window.cancelAnimationFrame(id);
	stopped = true;
	log('Stopped');
	musicPlayer.stop();
}


function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var scale = 4;
let animationStep = 0;
let running = [
	morty_run_1,
	morty_run_2,
	morty_run_3,
];
function drawMorty() {
	ctx.beginPath();
	ctx.imageSmoothingEnabled = false;
	if(morty.dy !== 0) {
		ctx.drawImage( morty_jump, morty.x, morty.y, morty_jump.width * scale, morty_jump.height * scale);
	} else {
		let anime = running[Math.floor(animationStep++ % 12 / 4)];
		ctx.drawImage( anime, morty.x, morty.y, anime.width * scale, anime.height * scale);
	}
}


let lava = { x: 0, y: 285 }
function drawWorld() {
	world.draw();

	portals.forEach((portal) => {
		ctx.beginPath();
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage( portal_img, portal.x, portal.y, portal_img.width * scale, portal_img.height * scale);
	});
}

function drawForeground() {
	// lava
	ctx.imageSmoothingEnabled = false;
	for(let i = 0; i < 8; i++) {
		ctx.drawImage( lava_img, lava.x + (32*scale * i), lava.y, 32 * scale, 32 * scale);
	}
}

function updateWorld() {
	world.update();
	
	// update lava
	lava.x -= 8;
	if(lava.x === -32*scale) lava.x = 0;

	//update portals
	portals.forEach((portal) => {
		portal.x -= 4;
	});
}

function clearStuff() {
	let remove = null;
	portals.forEach((portal, i) => {
		if (portal.x < -192) {
			remove = i;
		}
	});
	if(remove !== null) {
		portals.splice(remove, 1);
	}
}

function addScore(s) {
	score += s;
	document.getElementById('score').innerHTML = score;
}

function die(reason) {
	log('💀 Dead! Cause: ' + reason);
	document.getElementById('reason').innerHTML = 'Cause of death: ' + reason;
	stop();
	document.getElementById('end_screen').style.display = 'block';
}

let fps = 0, startTime = new Date();
function showFps() {
	let fps = Math.round(1000 / (new Date() - startTime));
	document.getElementById('fps').innerHTML = 'FPS: ' + fps;
	startTime = new Date();
}

function restart() {
	location.reload();
}

function teleport(portal) {
	log('Teleported');
	sounds.teleport();
	portals = [];
	portals = [{x: 30, y: 0}]; // start portal

	morty.y = 24;
	//morty.dy = 0;

	gravity = (Math.floor(Math.random() * 55) + 25) / 100;
	log('Gravity', gravity);

	changeBackground();
	world.changeColor();
	world.reset();
}

