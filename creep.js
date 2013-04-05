function Creep(board) {
	"use strict";

	var pathFinding = new AStar(board);
	var ele;

	// Callback called when at the end of the path
	var callback;

	// Path we are following
	var path;

	var timeout;

	// Where are we right now
	var row;
	var col;

	// WHere are we going
	var goal;

	// Initialize the creep to start at a location
	this.initialize = function(start, endGoal, callbackFn) {
		var parts = start.split("-");
		row = parseInt(parts[0]);
		col = parseInt(parts[1]);

		goal = endGoal;

		callback = callbackFn;

		ele = document.createElement("div");
		ele.className = "creep";
		var box = document.getElementById("box");
		$(box).append(ele);
	};

	this.stop = function() {
		console.log("stopping");
		path = [];
		clearTimeout(timeout);
		ele.removeEventListener('webkitTransitionEnd', transitionEnd);
	};

	this.start = function() {
		ele.addEventListener('webkitTransitionEnd', transitionEnd);
		if (path) {
			// Quick delay to render
			path.shift();
			setTimeout(moveToNext, 0);
		}
	};

	// Returns true if a path was found. False otherwise
	this.pathFind = function() {
		

		path = pathFinding.findPath(row + "-" + col, goal);


		if (!path) {
			return false;
		} else {
			return true;
		}
	};

	function moveToNext() {
		var next = path.shift();

		// no more items in path
		if (!next) {
			callback();
			return;
		}

		var nextParts = next.split("-");

		if (row < nextParts[0]) {
			row += 1;
		} else if (row > nextParts[0]) {
			row -= 1;
		} else if (col < nextParts[1]) {
			col += 1;
		} else {
			col -= 1;
		}


		var transform = "translate3d(" + (col * 20) + "px, " + (row * 20) + "px, 0px)";
		ele.style.webkitTransform = transform;
		console.log("moving to: " + next);

		timeout = setTimeout(moveToNext, 1000);
	}

	function transitionEnd() {
		clearTimeout(timeout);
		moveToNext();
	}
}