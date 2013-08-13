define(["GameVars"], function(GameVars) {
	return function(freeBullet) {
		"use strict";
		var self = this;

		var startLoc;
		var target;
		var onCollision;

		var currentX;
		var currentY;

		var ele;

		var collision_timer;
		var reclaim_timer;

		self.initialize = function() {
			var box = document.getElementById("box");
			ele = document.createElement("div");
			ele.className = "bullet";
			box.appendChild(ele);
		};

		self.setup = function(startLoc, target, onCollision) {
			this.startLoc = startLoc;
			this.target = target;
			this.onCollision = onCollision;

			var parts = startLoc.split("-");

			currentX = (parts[1] * GameVars.cellSize);
			currentY = (parts[0] * GameVars.cellSize);

			setTransform();
			setTimeout(reTarget, 0);
			collision_timer = setInterval(checkCollision, 10);

			// Reclaim the bullet after 1 second. Time matches CSS animation
			reclaim_timer = setTimeout(reclaim, 1000);
		};

		self.destroy = function() {
			clearTimeout(collision_timer);
			clearTimeout(reclaim_timer);
			freeBullet.call(self);
		};

		self.getTarget = function() {
			return self.target;
		};

		self.getEle = function() {
			if (ele === null) {
				console.log("Ele is null!");
			}
			return ele;
		};

		// Make sure that our target is alive

		function targetDead() {
			if (!self.target || !self.target.isAlive() || !self.target.getEle()) {
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
				self.onCollision.call(self);
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

			bulletX *= 200;
			bulletY *= 200;

			currentX += bulletX;
			currentY += bulletY;

			//console.log("Bullet distance: " + distance);

			setTransform();

		}

		function reclaim() {
			self.destroy();
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