function CreepManager(board) {
	var creeps = [];
	var self = this;

	this.addCreep = function(start, goal) {
		var creep = new Creep(board);
		creep.initialize(start, goal, this.creepFinished);
		creep.pathFind();
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

	this.destroy = function(creep) {
		var index =  creeps.indexOf(creep);
		creeps[index].destroy();

		remove(creep);
	};

	function remove(creep) {
		var index =  creeps.indexOf(creep);
		delete creeps[index];
	}
}