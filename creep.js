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


	// Values for our current translate
	var transX = 0;
	var transY = 0;

	// Initialize the creep to start at a location
	this.initialize = function(start, endGoal, callbackFn) {
		var parts = start.split("-");
		row = parts[0];
		col = parts[1];

		goal = endGoal;

		callback = callbackFn;

		ele = document.createElement("div");
		ele.className = "creep";
		var box = document.getElementById("box");
		$(box).append(ele);

		stop();
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
			animate();
		}
	};

	// Returns true if a path was found. False otherwise
	this.pathFind = function() {
		// Reset all the classes
		var lines = document.getElementById("box").childNodes;
		for (var i = 0; i < lines.length; i++) {
			for (var j = 0; j < lines[i].childNodes.length; j++) {
				lines[i].childNodes[j].className = "cell";
			}
		}

		path = pathFinding.findPath(row+"-"+col, goal);


		if (!path) {
			return false;
		} else {
			return true;
		}
	};

	function animate() {
		//ele.dataset.loc = path.shift();

		// Quick delay to render
		setTimeout(moveToNext, 0);
		//console.log(path);
	}

	function moveToNext() {
		//ele.dataset.loc = path.shift();
		//var next = path[0];
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
		//ele.dataset.loc = next;
		console.log("moving to: " + next);

		timeout = setTimeout(moveToNext, 1000);
	}

	function transitionEnd() {
		clearTimeout(timeout);
		moveToNext();
	}
}