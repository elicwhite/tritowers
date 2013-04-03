goog.require('goog.structs.PriorityQueue');

$(function() {

    var rows = "20";
    var cols = "30";

    var matrix = buildBoard(rows, cols);

    var currentCell = matrix[0][0];

    var pathFinding;

    function buildBoard(rows, cols) {
        var matrix = [];

        var box = document.getElementById("box");

        pathFinding = new AStar(matrix);


        // Chance of each cell being a block when we want 40 on the board
        var chance = 40/ (rows*cols);

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

                // we want roughly 40 blocks.
                if (Math.random() < chance) {
                    ele.dataset.type = "block";
                }

                ele.onclick = cellClicked;
                $(line).append(ele);
                matrix[row][col] = ele;
            }
            $(box).append(line);
        }

        return matrix;
    }

    function cellClicked() {
        // Reset all the classes
        var lines = document.getElementById("box").childNodes;
        for (var i = 0; i < lines.length; i++) {
            for (var j = 0; j < lines[i].childNodes.length; j++) {
                lines[i].childNodes[j].className = "cell";
            }
        }

        // Navigate to this cell
        var path = pathFinding.findPath(currentCell, this);

        path.forEach(function(item) {
            $(document.getElementById(item)).addClass("path");
        });
    }
});