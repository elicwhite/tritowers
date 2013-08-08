define(["jquery", "Bullet"], function($, Bullet) {
  function BulletManager() {
    "use strict";
    var self = this;

    var bulletCache = [];
    var bullets = [];

    this.initialize = function() {
      // For performance reasons, use the same creep objects.
      for (var i = 0; i < 20; i++) {
        var bullet = new Bullet(this.freeBullet);

        bullet.initialize();
        $(bullet.getEle()).addClass("cached");
        bulletCache.push(bullet);
      }
    };

    this.takeBullet = function(startLoc, target, onCollision) {
      var bullet = bulletCache.shift();

      bullet.setup(startLoc, target, onCollision);

      $(bullet.getEle()).removeClass("cached");

      bullets.push(bullet);
    };

    this.freeBullet = function() {
      console.log("Bullet Finished");
      remove(this);
    };

    function remove(bullet) {
      $(bullet.getEle()).addClass("cached");

      var index = bullets.indexOf(bullet);
      bullets.splice(index, 1);
      bulletCache.push(bullet);
    }
  }

  var instance = new BulletManager();

  return { instance: instance };
});