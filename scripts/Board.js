define(["AStar", "Tower"], function(AStar, Tower) {
	return function(rows, cols, start, goal) {
		var self = this;

		// Array of divs
		var elements;

		// Array of towers on the board
		var towers;

		var pathFinding;

		// Initialize the board matrix, set clickHandler
		// to be the handler for each element
		this.initialize = function(clickHandler) {
			elements = [];
			towers = [];

			var box = document.getElementById("box");

			for (var row = 0; row < rows; row++) {
				elements[row] = [];
				towers[row] = [];

				var line = document.createElement("div");
				line.className = "line";

				for (var col = 0; col < cols; col++) {
					var ele = document.createElement("div");
					ele.className = "cell";
					ele.row = row;
					ele.col = col;
					ele.id = ele.row + "-" + ele.col;

					ele.dataset.type = "free";

					ele.onclick = clickHandler;
					$(line).append(ele);
					elements[row][col] = ele;
					towers[row][col] = null;
				}
				$(box).append(line);
			}

			pathFinding = new AStar(this);
		};

		this.placeTower = function(loc, creep) {
			var l = parseLoc(loc);

			var t = new Tower(loc, elements[l.row][l.col], creep);
			towers[l.row][l.col] = t;
		};

		this.removeTower = function(loc) {
			var l = parseLoc(loc);
			var tower = towers[l.row][l.col];
			tower.destroy();
			tower = null;
		};

		this.getTower = function(loc) {
			var l = parseLoc(loc);

			var tower = towers[l.row][l.col];
			if (tower) {
				return tower;
			}

			consle.log("No Tower at " + loc);
		};


		// Looks at it's neighbors to find out if it's the third
		// of it's type connected
		this.isThird = function(loc) {
			var ele = document.getElementById(loc);

			var openSet = [ele];
			var closedSet = [];

			while (openSet.length > 0) {
				ele = openSet.pop();
				closedSet.push(ele);

				// Get all the neighbors that aren't in the closed set, and are of the same type
				var neighbors = this.getNeighbors(ele).filter(filter);

				for (var i = 0; i < neighbors.length; i++) {
					openSet.push(neighbors[i]);
				}
			}

			return {
				isThird: closedSet.length >= 3,
				elements: closedSet.map(function(element) {
					return towers[element.row][element.col];
				})
			};


			function filter(element) {
				return ((closedSet.indexOf(element) == -1) && (element.dataset.type == ele.dataset.type) && (element.dataset.level == ele.dataset.level));
			}
		};

		this.getNeighbors = function(ele) {
			var parts = ele.id.split("-");

			var neighbors = [];
			// check neighbors

			// top
			if (ele.row - 1 >= 0) {
				neighbors.push(elements[ele.row - 1][ele.col]);
			}

			// left
			if (ele.col - 1 >= 0) {
				neighbors.push(elements[ele.row][ele.col - 1]);
			}

			// right
			if (ele.col + 1 < elements[0].length) {
				neighbors.push(elements[ele.row][ele.col + 1]);
			}

			// bottom
			if (ele.row + 1 < elements.length) {
				neighbors.push(elements[ele.row + 1][ele.col]);
			}

			return neighbors;
		};

		this.hasPath = function() {
			path = pathFinding.findPath(start, goal);
			if (!path) {
				return false;
			} else {
				return true;
			}
		};

		this.distance = function(start, goal) {
			start = parseLoc(start);
			goal = parseLoc(goal);

			var dist = Math.abs(goal.row - start.row) + Math.abs(goal.col - start.col);
			return dist;
		};

		this.drawRange = function(loc, range) {
			var parts = loc.split("-");

			var ele = document.getElementById(loc);
			helper(ele, range);

			function helper(ele, depth) {
				if (depth === 0) {
					return;
				}

				$(ele).addClass("range");
				var neighbors = self.getNeighbors(ele);
				for (var i = 0; i < neighbors.length; i++) {
					helper(neighbors[i], depth - 1);
				}
			}
		};

		function parseLoc(loc) {
			var parts = loc.split("-");
			return {
				row: parts[0],
				col: parts[1]
			};
		}
	};
});