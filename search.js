goog.require('goog.structs.PriorityQueue');

$(function() {
    // How many blocks we will have on the page
    var rows = 10;
    var cols = 10;

    var b = new Board(10, 10, 0, 0, 9, 9);
    b.initialize(cellClicked);
    var matrix = b.getMatrix();

    var creep = new Creep(matrix);
    var foo = "bar";
    //var currentCell = matrix[0][0];
    var goal = matrix[rows - 1][cols - 1];

    setCreep();


    function setCreep() {
        // Put the creep at top left
        creep.initialize(0, 0, goal, setCreep);
        creep.pathFind();
        creep.start();
    }

    function cellClicked() {
        // You can only place a block where there is no block already
        if (this.dataset.type != "free") {
            return;
        } else {
            this.dataset.type = "block";
            this.dataset.level = 1;
        }

        creep.stop();

        // Recalculate the path to the goal
        if (!creep.pathFind() || !b.hasPath()) {
            console.log("You can't go there!");
            this.dataset.type = "free";
        }


        // path was found, merge neighbors
        var third = b.isThird(this);

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



            third = b.isThird(this);
        }

        // Now that we've cleared stuff, pathfind again
        creep.pathFind();
        creep.start();
    }
});