function CreepManager(board) {
	var creeps = [];

	this.addCreep = function(start, goal) {
		var creep = new Creep(board);
		creep.initialize(start, goal, this.creepFinished);
		creep.pathFind();
		creep.start();

		creeps.push(creep);
	};

	this.creepFinished = function() {
		//console.log("Creep Finished");
		var index =  creeps.indexOf(this);
		delete creeps[index];
		console.log(creeps);
	};

	this.stop = function() {
		for (var i in creeps) {
			creeps[i].stop();
		}
	};

	this.start = function() {
		for (var i in creeps) {
			creeps[i].start();
		}
	};

	// If any of the creeps can't find a path, stop and return false
	this.pathFind = function() {

		for (var i in creeps) {
			if (!creeps[i].pathFind()) return false;
		}

		return true;
	};
}