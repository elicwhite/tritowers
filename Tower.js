function Tower(loc, ele, creepManager) {
	ele.dataset.type="tower";

	console.log("Tower Placed");

	setInterval(shoot, 3000);

	function shoot() {
		var closest = creepManager.closest(loc);
		if (closest[0] < 4) {

			var target = closest[1];
			var bullet = new Bullet(loc, target);
			//creepManager.destroy(closest[1]);
		}
	}
}