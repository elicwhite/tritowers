function Board(rows, cols, start, goal) {
	var matrix;

	var pathFinding;

	// Initialize the board matrix, set clickHandler
	// to be the handler for each element
	this.initialize = function(clickHandler) {
		matrix = [];

		var box = document.getElementById("box");

		for (var row = 0; row < rows; row++) {
			matrix[row] = [];
			var line = document.createElement("div");
			line.className = "line";

			for (var col = 0; col < cols; col++) {
				var ele = document.createElement("div");
				ele.className = "cell";
				ele.row = row;
				ele.col = col;
				ele.id = ele.row + "-" + ele.col;

				ele.dataset.type = "free";
				if (row === 0 && col == 9) {
					ele.dataset.type = "block";
					ele.dataset.level = 1;
				}

				ele.onclick = clickHandler;
				$(line).append(ele);
				matrix[row][col] = ele;
			}
			$(box).append(line);
		}

		pathFinding = new AStar(this);
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

		return [closedSet.length >= 3, closedSet];


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
			neighbors.push(matrix[ele.row - 1][ele.col]);
		}

		// left
		if (ele.col - 1 >= 0) {
			neighbors.push(matrix[ele.row][ele.col - 1]);
		}

		// right
		if (ele.col + 1 < matrix[0].length) {
			neighbors.push(matrix[ele.row][ele.col + 1]);
		}

		// bottom
		if (ele.row + 1 < matrix.length) {
			neighbors.push(matrix[ele.row + 1][ele.col]);
		}

		return neighbors;
	};

	this.hasPath = function() {
		path = pathFinding.findPath(start, goal);
		if (!path) {
			return false;
		} else {
			
			// Reset all the classes
			var lines = document.getElementById("box").childNodes;
			for (var i = 0; i < lines.length; i++) {
				for (var j = 0; j < lines[i].childNodes.length; j++) {
					lines[i].childNodes[j].className = "cell";
				}
			}

			path.forEach(function(item) {
				$(document.getElementById(item)).addClass("path");
			});

			return true;
		}
	};
}