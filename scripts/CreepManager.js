define(["Creep"], function(Creep) {
	return function(board) {
		"use strict";
		var self = this;

		var creepCache = [];
		var creeps = [];

		this.initialize = function(start, goal) {
			// For performance reasons, use the same creep objects.
			for (var i = 0; i < 20; i++) {
				var creep = new Creep(board, creepDied, this.creepFinished);
				creep.initialize(start, goal);
				$(creep.getEle()).addClass("cached");
				creepCache.push(creep);
			}
		};

		this.addCreep = function() {
			var creep = creepCache.shift();

			// take a creep from the cache
			creep.resetPosition();
			creep.pathFind();
			$(creep.getEle()).removeClass("cached");
			creep.start();

			creeps.push(creep);
		};

		this.creepFinished = function() {
			//console.log("Creep Finished");
			remove(this);
		};

		// If any of the creeps can't find a path, stop and return false
		this.pathFind = function() {

			for (var i in creeps) {
				if (!creeps[i].pathFind()) return false;
			}

			return true;
		};

		this.closest = function(loc) {
			var shortestDist;
			var creep;
			for (var i in creeps) {
				var dist = board.distance(loc, creeps[i].getLoc());
				if (!creep || dist < shortestDist) {
					shortestDist = dist;
					creep = creeps[i];
				}
			}

			return [shortestDist, creep];
		};

		function remove(creep) {
			$(creep.getEle()).addClass("cached");

			var index = creeps.indexOf(creep);
			creeps.splice(index, 1);
			creepCache.push(creep);
		}

		function creepDied() {
			remove(this);
		}
	};
});