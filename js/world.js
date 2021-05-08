var World = function(config) {
	let that = this;
	
	this.tileWidth = 128;

	var x = 0;
	var y = 0;
	

	let tiles = [];
	tiles.push(...straight(5));
	tiles.push(...gap());
	tiles.push(...straight(5));
	tiles.push(...gap());
	tiles.push(...platforms());
	tiles.push(...gap());
	tiles.push(...platforms());
	tiles.push(...gap());
	tiles.push(...straight(5));
	tiles.push(...dip(5));
	tiles.push(...straight(2));
	tiles.push(...dip(1));
	tiles.push(...straight(2));
	tiles.push(...platforms());
	tiles.push(...straight(5));

	let fluids = [
		{ x: 500, y: 200, width: 48, height: 48, visible: true },
		{ x: 600, y: 200, width: 48, height: 48, visible: true },
		{ x: 3600, y: 200, width: 48, height: 48, visible: true },
	];


	this.getTileId = function() {
		// 10 is arbritary number, 0 is good
		return Math.round((-x + 32)/that.tileWidth);
	};

	this.getTile = function() {
		let i = that.getTileId();
		return i < tiles.length ? tiles[i] : { y: 1000, width: that.tileWidth, height: 100};
	};

	this.draw = function() {
		let c = that.getTile();

		tiles.forEach((tile, i) => {
			ctx.beginPath();
			ctx.fillStyle = "#ebd160";
			//if (c === tile) ctx.fillStyle = "#f00";
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

	function straight(length = 10) {
		let list = [];
		for(let i = 0; i < length; i++) {
			list.push({ x: 28, y: 260, width: that.tileWidth, height: 200});
		}
		return list;
	}

	function dip(length = 5) {
		let list = [];
		for(let i = 0; i < length; i++) {
			list.push({ x: 28, y: 340, width: that.tileWidth, height: 200});
		}
		return list;
	}

	function gap() {
		return [{ x: 28, y: 500, width: that.tileWidth, height: 10}];
	}

	function platforms() {
		return [
			{ x: 28, y: 260, width: that.tileWidth, height: 10},
			...gap(),
			{ x: 28, y: 230, width: that.tileWidth, height: 10},
			...gap(),
			{ x: 28, y: 260, width: that.tileWidth, height: 10},
		];
	}
};
