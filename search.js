goog.require('goog.structs.PriorityQueue');

$(function() {
    var pathFinding;

    var rows = "20";
    var cols = "30";

    // How many blocks we will have on the page
    var blocks = 100;

    var matrix = buildBoard(rows, cols);

    var currentCell = matrix[0][0];
    var goal = matrix[rows - 1][cols - 1];
    pathFind();

    function buildBoard(rows, cols) {
        var matrix = [];

        var box = document.getElementById("box");

        pathFinding = new AStar(matrix);

        for (var row = 0; row < rows; row++) {
            matrix[row] = [];
            var line = document.createElement("div");
            line.className = "line";

            for (var col = 0; col < cols; col++) {
                var ele = document.createElement("div");
                ele.className = "cell";
                ele.row = row;
                ele.col = col;
                ele.id = ele.row + "-" + ele.col;

                ele.dataset.type = "free";

                ele.onclick = cellClicked;
                $(line).append(ele);
                matrix[row][col] = ele;
            }
            $(box).append(line);
        }

        return matrix;
    }

    function cellClicked() {
        // You can only place a block where there is no block already
        if (this.dataset.type != "free") {
            return;
        } else {
            this.dataset.type = "block";
            this.dataset.level = 1;
        }

        // Recalculate the path to the goal
        if (!pathFind()) {
            console.log("You can't go there!");
            this.dataset.type = "free";
            pathFind();
        }


        // path was found, merge neighbors
        var third = isThird(this);

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

            // Now that we've cleared stuff, pathfind again
            pathFind();

            third = isThird(this);
        }
    }

    // Returns true if a path was found. False otherwise

    function pathFind() {
        // Reset all the classes
        var lines = document.getElementById("box").childNodes;
        for (var i = 0; i < lines.length; i++) {
            for (var j = 0; j < lines[i].childNodes.length; j++) {
                lines[i].childNodes[j].className = "cell";
            }
        }

        var path = pathFinding.findPath(currentCell, goal);
        if (!path) {
            return false;
        } else {
            path.forEach(function(item) {
                $(document.getElementById(item)).addClass("path");
            });
            return true;
        }
    }

    // Looks at it's neighbors to find out if it's the third
    // of it's type connected

    function isThird(ele) {
        var result = isThirdHelper([ele], []);
        return [result.length >= 3, result];

    }

    function isThirdHelper(openSet, closedSet) {
        // put Ele in scope for the filter
        var ele;
        // Add ele to a new closed set
        while (openSet.length > 0) {
            ele = openSet.pop();
            closedSet.push(ele);

            // Get all the neighbors that aren't in the closed set, and are of the same type
            var neighbors = pathFinding.getNeighbors(ele).filter(filter);

            for (var i = 0; i < neighbors.length; i++) {
                openSet.push(neighbors[i]);
            }
        }

        return closedSet;

        function filter(element) {
            return ((closedSet.indexOf(element) == -1) && (element.dataset.type == ele.dataset.type) && (element.dataset.level == ele.dataset.level));
        }
    }


});