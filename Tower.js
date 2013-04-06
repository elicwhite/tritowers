function Tower(loc, ele, creepManager) {
	ele.dataset.type="tower";

	console.log("Tower Placed");

	setInterval(shoot, 3000);

	var bullets = [];

	function shoot() {
		var closest = creepManager.closest(loc);
		if (closest[0] < 4) {

			var target = closest[1];
			bullets.push(new Bullet(loc, target, onCollision));
		}
	}

	function onCollision() {
		// Destroy the bullet
		this.destroy();
		creepManager.destroy(this.getTarget());
	}
}