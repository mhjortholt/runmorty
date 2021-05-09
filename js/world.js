var World = function(config) {
	let that = this;
	
	this.tileWidth = 128;

	var x = 0;
	var y = 0;
	

	let tiles = [];

	let fluids = [
		{ x: 500, y: 200, width: 48, height: 48, visible: true },
	];
	generateWorld(false);

	this.getTileId = function() {
		return Math.round((-x + morty.x) / that.tileWidth);
	};

	this.getTile = function() {
		let i = that.getTileId();
		return i < tiles.length ? tiles[i] : { y: 1000, width: that.tileWidth, height: 100};
	};

	this.getTiles = function() {
		let i = that.getTileId();
		let arr = [];
		if (i > 0 && i-1 < tiles.length) {
			let t = tiles[i-1];
			t.x = x + ((i-1)*that.tileWidth);
			arr.push(t);
		}
		if (i < tiles.length) {
			let t = tiles[i];
			t.x = x + (i*that.tileWidth);
			arr.push(t);
		}
		return arr;
	};

	let colors = [
		'#ebd160','#eb9c60','#c9514b','#96cc58','#316885','#672d80','#a116a6','#69071c','#0a326e','#6f757d','#2c2d2e',
		'#e3e3e3','#96531b','#a3cc1d'

	];
	let color = colors[Math.round(Math.random() * colors.length)];

	this.changeColor = function() {
		color = colors[Math.round(Math.random() * colors.length)];
	};

	this.draw = function() {
		let ts = that.getTiles();
		let a = ts[0];
		let b = ts[1];

		tiles.forEach((tile, i) => {
			ctx.beginPath();
			ctx.fillStyle = color;
			//if (a === tile) ctx.fillStyle = "#0f0";
			//if (b === tile) ctx.fillStyle = "#f00";
			if(tile.highlight)ctx.fillStyle = "#f00";
			ctx.rect(x + (i*that.tileWidth), y+tile.y, that.tileWidth, tile.height);
			ctx.fill();
		});

		// Fluids
		fluids.forEach((fluid) => {
			if(fluid.visible) {
				ctx.beginPath();
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage( fluid_img, fluid.x, fluid.y, fluid_img.width * scale, fluid_img.height * scale);
			}
		});
	};

	this.update = function() {
		x = x - 4;
		fluids.forEach((fluid) => { fluid.x -= 4 });
	};

	this.getFluids = function() {
		return fluids;
	};

	this.reset = function() {
		x = 0;
		generateWorld();
	};

	function straight(length = 3) {
		let list = [];
		for(let i = 0; i < length; i++) {
			list.push({ x: 0, y: 260, width: that.tileWidth, height: 200});
		}
		return list;
	}

	function dip(length = 5) {
		let list = [];
		for(let i = 0; i < length; i++) {
			list.push({ x: 0, y: 340, width: that.tileWidth, height: 200});
		}
		return list;
	}

	function gap() {
		return [{ x: 0, y: 500, width: that.tileWidth, height: 10}];
	}

	function platforms() {
		return [
			{ x: 0, y: 260, width: that.tileWidth, height: 10},
			...gap(),
			{ x: 0, y: 230, width: that.tileWidth, height: 10},
			...gap(),
			{ x: 0, y: 260, width: that.tileWidth, height: 10},
		];
	}

	function bigPlatforms() {
		return [
			...gap(),
			{ x: 0, y: 290, width: that.tileWidth, height: 30},
			...gap(),
			{ x: 0, y: 260, width: that.tileWidth, height: 30},
			...gap(),
			{ x: 0, y: 230, width: that.tileWidth, height: 30},
			...gap(),
			{ x: 0, y: 260, width: that.tileWidth, height: 30},
			...gap(),
			{ x: 0, y: 260, width: that.tileWidth, height: 30},
			...gap(),
			{ x: 0, y: 230, width: that.tileWidth, height: 30},
			...gap(),
			{ x: 0, y: 290, width: that.tileWidth, height: 30},
			...gap(),
			{ x: 0, y: 260, width: that.tileWidth, height: 30},
		];
	}

	function stairs() {
		return [
			{ x: 0, y: 260, width: that.tileWidth, height: 500},
			{ x: 0, y: 250, width: that.tileWidth, height: 500},
			{ x: 0, y: 240, width: that.tileWidth, height: 500},
			{ x: 0, y: 230, width: that.tileWidth, height: 500},
			{ x: 0, y: 220, width: that.tileWidth, height: 500},
			{ x: 0, y: 210, width: that.tileWidth, height: 500},
			{ x: 0, y: 200, width: that.tileWidth, height: 500},
			{ x: 0, y: 190, width: that.tileWidth, height: 500},
			{ x: 0, y: 180, width: that.tileWidth, height: 500},
		];
	}

	function bigStairs() {
		return [
			{ x: 0, y: 260, width: that.tileWidth, height: 500},
			{ x: 0, y: 230, width: that.tileWidth, height: 500},
			{ x: 0, y: 200, width: that.tileWidth, height: 500},
			{ x: 0, y: 170, width: that.tileWidth, height: 500},
		];
	}
	function pillars() {
		return [
			...gap(),
			{ x: 0, y: 240, width: that.tileWidth, height: 500},
			...gap(),
			{ x: 0, y: 240, width: that.tileWidth, height: 500},
			...gap(),
			{ x: 0, y: 240, width: that.tileWidth, height: 500},
			...gap(),
			{ x: 0, y: 240, width: that.tileWidth, height: 500},
			...gap(),
			{ x: 0, y: 240, width: that.tileWidth, height: 500},
		];
	}

	function generateWorld(add_fluids = true) {
		// Reset
		if (add_fluids) {
			fluids = [];
		}
		tiles = [];


		tiles.push(...straight(5)); // Always start with a straight
		let sections = Math.floor(Math.random() * 20) + 5;

		for(let i = 0; i < sections; i++) {
			let r = Math.floor(Math.random() * 8);
			switch (r) {
				case 0: tiles.push(...straight(5)); break;
				case 1: tiles.push(...platforms()); break;
				case 2: tiles.push(...[...gap(), ...straight(3)]); break;
				case 3: tiles.push(...dip(3)); break;
				case 4: tiles.push(...stairs()); break;
				case 5: tiles.push(...bigStairs()); break;
				case 6: tiles.push(...bigPlatforms()); break;
				case 7: tiles.push(...pillars()); break;
			}
			
		}

		// add fluids
		if (true || add_fluids) {
			let r = random(1,10);
			let total = tiles.length * that.tileWidth;
			for( let i = 0; i < r; i++) {
				let dist = random(300, total);
				let tile = tiles[Math.round(dist / that.tileWidth)];
				
				if(tile) {
					//tile.highlight = true;
					if(tile.y > 360 ) { // 360 = lava death
						fluids.push( { x: dist, y: 160, width: 48, height: 48, visible: true });
					} else {
						fluids.push( { x: dist, y: tile.y-64, width: 48, height: 48, visible: true });
					}
				}
			}
		}
	}
};
