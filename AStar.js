function AStar(board) {
	"use strict";

	this.findPath = function(start, goal) {
		var closedSet = [];
		var openSet = new goog.structs.PriorityQueue();

		var cameFrom = {};

		var g_score = {};
		var f_score = {};
		g_score[start] = 0;

		f_score[start] = g_score[start] + manhattan_distance(start, goal);

		// enqueue the start cell
		openSet.enqueue(f_score[start], start);

		while (!openSet.isEmpty()) {
			var current = openSet.dequeue();
			// style the ones we've processed
			if (current == goal) {
				return reconstructPath(cameFrom, goal);
			}

			closedSet.push(current);



			var neighbors = board.getNeighbors(document.getElementById(current)).filter(neighborFilter);

			for (var i = 0; i < neighbors.length; i++) {
				var neighbor = neighbors[i].id;

				var temp_g_score = g_score[current] + manhattan_distance(current, neighbor);
				if (closedSet.indexOf(neighbor) >= 0) {
					if (temp_g_score >= g_score[neighbor]) {
						continue;
					}
				}

				if (!openSet.containsValue(neighbor) || temp_g_score < g_score[neighbor]) {
					cameFrom[neighbor] = current;
					g_score[neighbor] = temp_g_score;
					f_score[neighbor] = g_score[neighbor] + manhattan_distance(neighbor, goal);
					if (!openSet.containsValue(neighbor)) {
						openSet.enqueue(f_score[neighbor], neighbor);
					}
				}
			}
		}

		return false;
	};

	function neighborFilter(element) {
		return (element.dataset.type != "block");
	}

	function manhattan_distance(start, goal) {
		var sP = start.split("-");
		var gP = goal.split("-");

		var dist = Math.abs(gP[0] - sP[0]) + Math.abs(gP[1] - sP[1]);
		return dist;
	}

	function reconstructPath(cameFrom, currentId) {
		if (currentId in cameFrom) {
			var p = reconstructPath(cameFrom, cameFrom[currentId]);
			p.push(currentId);
			return p;
		}
		return [currentId];
	}
}