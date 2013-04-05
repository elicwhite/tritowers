function Tower(ele, creep) {
	ele.dataset.type="tower";

	console.log("Tower Placed");

	setTimeout(shoot, 2000);

	function shoot() {
//		var creeps = document.getElementsByClassName("creep");

		creep.destroy();
	}
}