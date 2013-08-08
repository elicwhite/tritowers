define(["AStar", "GameVars"], function(AStar, GameVars) {
	return function(board, diedCallback, finishedCallback) {
		"use strict";
		var self = this;

		var pathFinding = new AStar(board);
		var ele;

		// Path we are following
		var path;

		var timeout;

		// what was the start position?
		var startPos;
		// And the goal position
		var goalPos;

		// Where are we right now
		var row;
		var col;

		var life = 10;

		var cellSize = GameVars.cellSize;

		// Initialize the creep to start at a location
		this.initialize = function(start, goal) {
			this.startPos = start;
			this.goalPos = goal;

			ele = document.createElement("div");
			ele.className = "creep";
			var box = document.getElementById("box");
			$(box).append(ele);
		};

		this.resetPosition = function() {
			var parts = this.startPos.split("-");
			row = parseInt(parts[0], 10);
			col = parseInt(parts[1], 10);

			setPosition(col, row);
		};

		this.stop = function() {
			path = [];
			clearTimeout(timeout);
			//ele.removeEventListener('webkitTransitionEnd', transitionEnd);
		};

		this.start = function() {
			//ele.addEventListener('webkitTransitionEnd', transitionEnd);
			if (path) {
				// Quick delay to render
				setTimeout(moveToNext, 0);
			}
		};

		// Returns true if a path was found. False otherwise
		this.pathFind = function() {
			path = pathFinding.findPath(row + "-" + col, this.goalPos);


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
			if (ele === null) {
				console.log("Ele is null!");
			}
			return ele;
		};

		this.destroy = function() {
			this.stop();
		};

		this.damage = function(damage) {
			life -= damage;
			if (life <= 0) {
				self.destroy();
				diedCallback.call(self);
			}
		};

		this.isAlive = function() {
			return life > 0;
		};

		function setPosition(row, col) {
			var transform = "translate3d(" + (col * cellSize) + "px, " + (row * cellSize) + "px, 0px)";
			ele.style.webkitTransform = transform;
		}

		function moveToNext() {
			var current = path.shift();
			var next = path[0];

			// no more items in path
			if (!next) {
				self.destroy();
				finishedCallback.call(self);
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

			setPosition(tempRow, tempCol);
			
			//console.log("moving to: " + next);

			timeout = setTimeout(moveToNext, 1000);
		}

		function transitionEnd() {
			//clearTimeout(timeout);
			moveToNext();
		}
	};
});