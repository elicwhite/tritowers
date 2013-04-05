function Creep(board) {

	var matrix = board;
	var path;

	var ele = document.createElement("div");
	ele.className = "creep";
	var box = document.getElementById("box");
	$(box).append(ele);

	var timeout;

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

		var direction = "";
		if (current[0] < next[0]) {
			direction = "down";
		} else if (current[0] > nextParts[0]) {
			direction = "up";
		} else if (current[1] < nextParts[1]) {
			direction = "right";
		} else {
			direction = "left";
		}

		ele.dataset.loc = next;

		move(direction);
		console.log(next);
	}

	function move(direction) {
		var transform = "";
		if (direction == "down") {
			transform = "0px, 20px";
		} else if (direction == "up") {
			transform = "0px, -20px";
		} else if (direction == "right") {
			transform = "20px, 0px";
		} else {
			transform = "-20px, 0px";
		}

		ele.style.webkitTransform = "translate("+transform+")";
		console.log("moving!");
		timeout = setTimeout(moveToNext, 1000);
	}
}