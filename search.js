goog.require('goog.structs.PriorityQueue');

$(function() {
    // How many blocks we will have on the page
    var rows = 10;
    var cols = 10;

    var start = "0-0";
    var goal = "9-9";

    var b = new Board(10, 10, start, goal);
    b.initialize(cellClicked);

    var creepManager = new CreepManager(b);

    setInterval(function() {
        creepManager.addCreep(start, goal);
    }, 2300);

    //b.placeTower("5-4", creep);

    b.hasPath();



    function cellClicked() {
        // You can only place a block where there is no block already
        if (this.dataset.type != "free") {
            return;
        } else {
            this.dataset.type = "block";
            this.dataset.level = 1;
        }

        creepManager.stop();

        // Recalculate the path to the goal
        if (!creepManager.pathFind() || !b.hasPath()) {
            console.log("You can't go there!");
            this.dataset.type = "free";
        }


        // path was found, merge neighbors
        var third = b.isThird(this.id);

        // Make sure we keep checking while we change things
        while (third[0]) {
            // Clear all the elements
            for (var i = 0; i < third[1].length; i++) {
                // Don't change the clicked item
                if (third[1][i] == this) {
                    this.dataset.level++;
                } else {
                    third[1][i].dataset.type = "free";
                }
            }



            third = b.isThird(this.id);
        }

        // Now that we've cleared stuff, pathfind again
        creepManager.pathFind();
        creepManager.start();
    }
});