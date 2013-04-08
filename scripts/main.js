require(["jquery", "Board", "CreepManager"], function($, Board, CreepManager) {
	$(function() {
		// How many blocks we will have on the page
		var rows = 13;
		var cols = 13;

		var start = "0-0";

		var goal = "10-10";

		var b = new Board(rows, cols, start, goal);
		b.initialize(cellClicked);

		var creepManager = new CreepManager(b);

		setInterval(function() {
			creepManager.addCreep(start, goal);
		}, 2300);

		b.placeTower("2-2", creepManager);

		b.hasPath();



		function cellClicked() {
			// You can only place a block where there is no block already
			if (this.dataset.type != "free") {
				return;
			}

			var tower = b.placeTower(this.id, creepManager);

			// Recalculate the path to the goal
			if (!creepManager.pathFind() || !b.hasPath()) {
				console.log("You can't go there!");
				tower.destroy();
			}



			// path was found, merge neighbors
			var third = b.isThird(this.id);

			// Make sure we keep checking while we change things
			while (third.isThird) {
				// Clear all the elements
				for (var i = 0; i < third.elements.length; i++) {
					// Don't change the clicked item
					var curTower = third.elements[i];
					if (curTower.getLoc() == this.id) {
						curTower.levelUp();
					} else {
						b.removeTower(curTower.getLoc());
					}
				}

				third = b.isThird(this.id);
			}

			// Now that we've cleared stuff, pathfind again
			creepManager.pathFind();
		}
	});
});