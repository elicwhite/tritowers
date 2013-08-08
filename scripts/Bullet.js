define(["GameVars"], function(GameVars) {
	return function(onCollision) {
		"use strict";
		var self = this;

		var startLoc;
		var target;

		var currentX;
		var currentY;

		var ele;

		var collision_timer;

		self.destroy = function() {
			clearTimeout(collision_timer);
			ele.parentNode.removeChild(ele);
		};

		self.getTarget = function() {
			return self.target;
		};

		self.setup = function(startLoc, target) {
			this.startLoc = startLoc;
			this.target = target;

			var box = document.getElementById("box");
			ele = document.createElement("div");
			ele.className = "bullet";
			box.appendChild(ele);

			var parts = startLoc.split("-");

			currentX = (parts[1] * GameVars.cellSize);
			currentY = (parts[0] * GameVars.cellSize);

			setTransform();

			//setInterval(reTarget, 300);
			setTimeout(reTarget, 0);
			ele.addEventListener('webkitTransitionEnd', reTarget);

			collision_timer = setInterval(checkCollision, 10);
		};

		// Make sure that our target is alive

		function targetDead() {
			if (!self.target || !self.target.isAlive() || !self.target.getEle()) {
				self.destroy();
				return true;
			}

			return false;
		}

		function checkCollision() {
			if (targetDead()) return;

			var targetEle = self.target.getEle();
			var targetLoc = getLoc(targetEle);
			var eleLoc = getLoc(ele);

			var tTop = targetLoc.y; // - 0.5 * targetEle.offsetHeight;
			var tBottom = targetLoc.y + targetEle.offsetHeight;
			var tLeft = targetLoc.x; // - 0.5 * targetEle.offsetWidth;
			var tRight = targetLoc.x + targetEle.offsetWidth;

			var eTop = eleLoc.y; // - 0.5 * ele.offsetHeight;
			var eBottom = eleLoc.y + ele.offsetHeight;
			var eLeft = eleLoc.x; // - 0.5 * ele.offsetWidth;
			var eRight = eleLoc.x + ele.offsetWidth;

			var collide = !(tLeft > eRight || tRight < eLeft || tTop > eBottom || tBottom < eTop);

			if (collide) {
				onCollision.call(self);
			}
		}


		function reTarget() {
			if (targetDead()) return;

			var targetLoc = getLoc(self.target.getEle());

			var bulletX = (targetLoc.x - currentX);
			var bulletY = (targetLoc.y - currentY);

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

		function getLoc(ele) {
			var targetMatrix = new WebKitCSSMatrix(window.getComputedStyle(ele).webkitTransform);
			return {
				x: targetMatrix.e,
				y: targetMatrix.f
			};
		}
	};
});