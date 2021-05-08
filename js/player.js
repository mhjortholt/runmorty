let Player = function(config) {
	let that = this;
	this.x = config.x; 
	this.y = config.y; 
	this.dy = config.dy; 
	this.width = config.width;
	this.height = config.height;
	

	let hitboxes = {};

	this.addHitbox = function(name, values) {
		hitboxes[name] = values;
	};

	this.getHitbox = function(name) {
		let hitbox = {
			x: hitboxes[name].x + that.x,
			y: hitboxes[name].y + that.y,
			width: hitboxes[name].width,
			height: hitboxes[name].height
		}
		return hitbox;
	};
}