define([], function() {
	return function(board) {
		"use strict";

		this.findPath = function(start, goal) {
			var closedSet = [];
			var openSet = new goog.structs.PriorityQueue();

			var cameFrom = {};

			var g_score = {};
			var f_score = {};
			g_score[start] = 0;

			f_score[start] = g_score[start] + board.distance(start, goal);

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

					var temp_g_score = g_score[current] + board.distance(current, neighbor);
					if (closedSet.indexOf(neighbor) >= 0) {
						if (temp_g_score >= g_score[neighbor]) {
							continue;
						}
					}

					if (!openSet.containsValue(neighbor) || temp_g_score < g_score[neighbor]) {
						cameFrom[neighbor] = current;
						g_score[neighbor] = temp_g_score;
						f_score[neighbor] = g_score[neighbor] + board.distance(neighbor, goal);
						if (!openSet.containsValue(neighbor)) {
							openSet.enqueue(f_score[neighbor], neighbor);
						}
					}
				}
			}

			return false;
		};

		function neighborFilter(element) {
			return (element.dataset.type == "free");
		}

		function reconstructPath(cameFrom, currentId) {
			if (currentId in cameFrom) {
				var p = reconstructPath(cameFrom, cameFrom[currentId]);
				p.push(currentId);
				return p;
			}
			return [currentId];
		}
	};
});