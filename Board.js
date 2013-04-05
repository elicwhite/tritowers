function Board(rows, cols, startRow, startCol, endRow, endCol) {
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

	this.getMatrix = function() {
		return matrix;
	};


	// Looks at it's neighbors to find out if it's the third
    // of it's type connected
	this.isThird = function(ele) {

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

	this.getNeighbors = function(cell) {
		var neighbors = [];

		// check neighbors

		// top
		if (cell.row - 1 >= 0) {
			neighbors.push(matrix[cell.row - 1][cell.col]);
		}

		// left
		if (cell.col - 1 >= 0) {
			neighbors.push(matrix[cell.row][cell.col - 1]);
		}

		// right
		if (cell.col + 1 < matrix[0].length) {
			neighbors.push(matrix[cell.row][cell.col + 1]);
		}

		// bottom
		if (cell.row + 1 < matrix.length) {
			neighbors.push(matrix[cell.row + 1][cell.col]);
		}

		return neighbors;
	};

	this.hasPath = function() {
		var result = pathFinding.findPath(matrix[startRow][startCol], matrix[endRow][endCol]);
		if (result) {
			return true;
		}

		return false;
	};
}