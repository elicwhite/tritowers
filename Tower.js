function Tower(loc, ele, creepManager) {
	ele.dataset.type="tower";

	console.log("Tower Placed");

	setInterval(shoot, 3000);

	function shoot() {
//		var creeps = document.getElementsByClassName("creep");

		var closest = creepManager.closest(loc);
		if (closest[0] < 4) {
			creepManager.destroy(closest[1]);
		}
	}
}