goog.require('goog.structs.PriorityQueue');

var gameVars = getLessVars("vars");

$(function() {
    // How many blocks we will have on the page
    var rows = 20;
    var cols = 20;

    var start = "0-0";

    var goal = "19-19";

    var b = new Board(rows, cols, start, goal);
    b.initialize(cellClicked);

    var creepManager = new CreepManager(b);

    setInterval(function() {
        creepManager.addCreep(start, goal);
    }, 2300);

    b.placeTower("2-2", creepManager);

    b.hasPath();



    function cellClicked() {
        // You can only place a block where there is no block already
        if (this.dataset.type == "tower") {
            var tower = b.getTower(this.id);
            b.drawRange(this.id, tower.getRange());
            return;
        }
        else if (this.dataset.type != "free") {
            return;
        } else {
            this.dataset.type = "block";
            this.dataset.level = 1;
        }

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
    }
});

function matrixToArray(matrix) {
    return matrix.substr(12, matrix.length - 8).split(', ');
}