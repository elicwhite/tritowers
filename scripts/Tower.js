define(["BulletManager", "Bullet"], function(BulletManager, Bullet) {
	return function(loc, ele, creepManager) {
		var self = this;

		var interval;

		var level = 1;


		this.getRange = function() {
			return 4;
		};

		this.towerType = function() {
			return "block";
		};

		this.getLevel = function() {
			return level;
		};

		this.destroy = function() {
			ele.dataset.type = "free";
			clearInterval(interval);
		};

		this.levelUp = function() {
			level++;
			ele.dataset.level = level;
		};

		this.getLoc = function() {
			return loc;
		};

		function init() {
			ele.dataset.type = self.towerType();
			ele.dataset.level = level;

			console.log("Tower Placed");
			interval = setInterval(shoot, 500);
		}

		function shoot() {
			var closest = creepManager.closest(loc);
			if (closest[0] < self.getRange()) {

				var target = closest[1];

				var bullet = BulletManager.instance.takeBullet(loc, target, onCollision);
			}
		}

		function onCollision() {
			// Destroy the bullet
			this.destroy();
			this.getTarget().damage(self.getLevel());
			//creepManager.destroy(this.getTarget());
		}

		init();
	};
});