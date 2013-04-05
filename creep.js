function Creep(board) {

	var matrix = board;
	var path;

	var ele = document.createElement("div");
	ele.className = "creep";

	var timeout;

	this.animate = function(directions) {
		path = directions;
		

		moveToNext();
		//console.log(path);
	};

	ele.addEventListener('webkitTransitionEnd', function() {
		clearTimeout(timeout);
		moveToNext();
	}, false);

	function moveToNext() {
		var start = path.shift();
		var startEle = document.getElementById(start);
		ele.dataset.loc = start;

		//$(ele).addClass("moveDown");
		$(startEle).append(ele);

		var next = path[0];
		// no more items in path
		if (!next) {
			return;
		}

		move("down");

		console.log(next);
	}

	function move(direction) {
		ele.style.webkitTransform = "translate(0px, 20px)";
		console.log("moving!");
		//timeout = setTimeout(moveToNext, 1000);
	}
}