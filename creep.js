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

	var self = this;

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
		path = [];
		clearTimeout(timeout);
		ele.removeEventListener('webkitTransitionEnd', transitionEnd);
	};

	this.start = function() {
		ele.addEventListener('webkitTransitionEnd', transitionEnd);
		if (path) {
			// Quick delay to render
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

	this.getLoc = function() {
		return row + "-" + col;
	};

	this.getEle = function() {
		return ele;
	};

	this.destroy = function() {
		this.stop();
		ele.parentNode.removeChild(ele);
	};

	function moveToNext() {
		var current = path.shift();
		var next = path[0];

		// no more items in path
		if (!next) {
			self.destroy();
			callback.call(self);
			return;
		}

		// We only want to set the row and col
		// variables after we have moved somewhere.
		// Otherwise we can move fast if this fn is called
		// repeatedly.

		var curParts = current.split("-");
		var nextParts = next.split("-");

		if (row < curParts[0]) {
			row += 1;
		} else if (row > curParts[0]) {
			row -= 1;
		} else if (col < curParts[1]) {
			col += 1;
		} else if (col > curParts[1]) {
			col -= 1;
		}

		var tempRow = row;
		var tempCol = col;

		if (row < nextParts[0]) {
			tempRow += 1;
		} else if (row > nextParts[0]) {
			tempRow -= 1;
		} else if (col < nextParts[1]) {
			tempCol += 1;
		} else if (col > nextParts[1]) {
			tempCol -= 1;
		}


		var transform = "translate3d(" + (tempCol * 20) + "px, " + (tempRow * 20) + "px, 0px)";
		ele.style.webkitTransform = transform;
		//console.log("moving to: " + next);

		timeout = setTimeout(moveToNext, 1000);
	}

	function transitionEnd() {
		clearTimeout(timeout);
		moveToNext();
	}
}