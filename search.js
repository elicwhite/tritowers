goog.require('goog.structs.PriorityQueue');

$(function() {
    var pathFinding;

    var rows = "20";
    var cols = "30";

    // How many blocks we will have on the page
    var blocks = 100;

    handleControls();

    var matrix = buildBoard(rows, cols);
    setBlocks(blocks);

    var currentCell = matrix[0][0];
    var goal;

    var currentType = "search";



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
        if (currentType == "block") {
            if (this.dataset.type == "block") {
                this.dataset.type = "free";
            } else {
                this.dataset.type = "block";
            }

            // Recalculate the path to the goal
            if (goal) {
                pathFind(goal);
            }
        } else if (currentType == "search") {
            // Navigate to this cell
            goal = this;
            pathFind(goal);
        }
    }

    function pathFind(goal) {
        // Reset all the classes
        var lines = document.getElementById("box").childNodes;
        for (var i = 0; i < lines.length; i++) {
            for (var j = 0; j < lines[i].childNodes.length; j++) {
                lines[i].childNodes[j].className = "cell";
            }
        }

        var path = pathFinding.findPath(currentCell, goal);
        if (!path) {
            console.log("No Path!");
        } else {
            path.forEach(function(item) {
                $(document.getElementById(item)).addClass("path");
            });
        }
    }

    function handleControls() {
        $("input[name='inputType']").change(function() {
            currentType = this.value;
        });

        document.getElementById("regenerate").addEventListener("click", (function() {
            setBlocks(blocks);

            if (goal) {
                pathFind(goal);
            }
        }));
    }

    function setBlocks(blocks) {
        // Clear the blocks from the board
        var lines = document.getElementById("box").childNodes;
        for (var i = 0; i < lines.length; i++) {
            for (var j = 0; j < lines[i].childNodes.length; j++) {
                lines[i].childNodes[j].dataset.type = "free";
            }
        }

        for (i = 0; i < blocks; i++) {
            var row = random(0, rows - 1);
            var col = random(0, cols - 1);

            matrix[row][col].dataset.type = "block";
        }
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});