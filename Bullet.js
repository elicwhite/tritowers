function Bullet(startLoc, target) {
	var currentX;
	var currentY;

	var ele;

	setup();

	function setup() {
		var box = document.getElementById("box");
		ele = document.createElement("div");
		ele.className = "bullet";
		box.appendChild(ele);

		var parts = startLoc.split("-");

		currentX = (parts[1] * 20);
		currentY = (parts[0] * 20);

		setTransform();

		//setInterval(reTarget, 300);
		setTimeout(reTarget, 0);
		ele.addEventListener('webkitTransitionEnd', reTarget);
	}



	function reTarget() {
		var targetMatrix = new WebKitCSSMatrix(target.getEle().style.webkitTransform);
		//console.log("Target at: "+targetMatrix.e+", "+targetMatrix.f);	
		//console.log("I'm at: "+currentX+", "+currentY);

		var bulletX = (targetMatrix.e - currentX);
		var bulletY = (targetMatrix.f - currentY);

		var distance = Math.sqrt(bulletX * bulletX + bulletY * bulletY);
		bulletX /= distance;
		bulletY /= distance;

		// bulletX and Y are now normalized

		bulletX *= 20;
		bulletY *= 20;

		currentX += bulletX;
		currentY += bulletY;

		//console.log("Bullet distance: " + distance);

		setTransform();

	}

	function setTransform() {
		var transform = "translate3d(" + currentX + "px, " + currentY + "px, 0px)";
		ele.style.webkitTransform = transform;
	}
}