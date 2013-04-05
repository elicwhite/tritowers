function Creep(board) {
	"use strict";

	var matrix = board;
	var path;

	var ele = document.createElement("div");
	ele.className = "creep";
	var box = document.getElementById("box");
	$(box).append(ele);

	var timeout;

	var transX = 0;
	var transY = 0;

	this.animate = function(directions) {
		path = directions;
		ele.dataset.loc = path.shift();

		// Quick delay to render
		setTimeout(moveToNext, 0);
		//console.log(path);
	};

	ele.addEventListener('webkitTransitionEnd', function() {
		clearTimeout(timeout);
		moveToNext();
	}, false);

	function moveToNext() {
		var next = path.shift();

		// no more items in path
		if (!next) {
			return;
		}

		var current = ele.dataset.loc.split("-");
		var nextParts = next.split("-");

		if (current[0] < nextParts[0]) {
			transY += 20;
		} else if (current[0] > nextParts[0]) {
			transY -= 20;
		} else if (current[1] < nextParts[1]) {
			transX += 20;
		} else {
			transX -= 20;
		}

		var transform = "translate3d(" + transX + "px, " + transY + "px, 0px)";
		ele.style.webkitTransform = transform;
		ele.dataset.loc = next;
		console.log("moving to: "+next);

		timeout = setTimeout(moveToNext, 1000);
	}
}