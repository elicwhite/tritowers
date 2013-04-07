function Tower(loc, ele, creepManager) {
	var self = this;

	ele.dataset.type = "tower";

	console.log("Tower Placed");

	setInterval(shoot, 3000);

	//var bullets = [];

	function shoot() {
		var closest = creepManager.closest(loc);
		if (closest[0] < self.getRange()) {

			var target = closest[1];
			new Bullet(loc, target, onCollision);
		}
	}

	function onCollision() {
		// Destroy the bullet
		this.destroy();
		creepManager.destroy(this.getTarget());
	}

	this.getRange = function() {
		return 4;
	};

	function getLoc() {
		return loc;
	}
}