goog.require('goog.structs.Set');
goog.require('goog.structs.Map');
goog.require('goog.structs.PriorityQueue');

$(function() {

    var rows = "20";
    var cols = "30";

    var matrix = buildBoard(rows, cols);

    var currentCell = matrix[0][0];

    function buildBoard(rows, cols) {
        var matrix = [];

        var box = document.getElementById("box");
        //console.log(box);

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
        var path = astar(this);

        path.forEach(function(item) {
            $(document.getElementById(item)).addClass("path");
        });
    }

    // navigate to cell from currentCell

    function astar(goal) {
        var start = currentCell;

        var closedSet = [];
        var openSet = new goog.structs.PriorityQueue();

        var cameFrom = [];

        var g_score = [];
        var f_score = [];
        g_score[start] = 0;

        f_score[start] = g_score[start] + manhattan_distance(start, goal);

        // enqueue the start cell
        openSet.enqueue(f_score[start], currentCell);

        while (!openSet.isEmpty()) {
            var current = openSet.dequeue();
            // style the ones we've processed
            $(current).addClass("checked");
            if (current == goal) {
                return reconstructPath(cameFrom, goal.id);
            }

            closedSet.push(current);

            var neighbors = getNeighbors(current);

            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];
                var temp_g_score = g_score[current] + manhattan_distance(current, neighbor);
                if (closedSet.indexOf(neighbor) >= 0) {
                    if (temp_g_score >= g_score[neighbor]) {
                        continue;
                    }
                }

                if (!openSet.containsValue(neighbor) || temp_g_score < g_score[neighbor]) {
                    cameFrom[neighbor.id] = current.id;
                    g_score[neighbor] = temp_g_score;
                    f_score[neighbor] = g_score[neighbor] + manhattan_distance(neighbor, goal);
                    if (!openSet.containsValue(neighbor)) {
                        openSet.enqueue(f_score[neighbor], neighbor);
                    }
                }
            }
        }

        return false;
    }

    function manhattan_distance(start, goal) {
        var dist = Math.abs(goal.row - start.row) + Math.abs(goal.col - start.col);
        return dist;
    }

    function reconstructPath(cameFrom, currentId) {
        if (currentId in cameFrom) {
            var p = reconstructPath(cameFrom, cameFrom[currentId]);
            p.push(currentId);
            return p;
        }
        return [currentId];
    }

    function getNeighbors(cell) {
        var neighbors = [];

        // check neighbors

        // top
        if (cell.row - 1 >= 0) {
            neighbors.push(matrix[cell.row - 1][cell.col]);
        }

        // left
        if (cell.col - 1 >= 0) {
            neighbors.push(matrix[cell.row][cell.col - 1]);
        }

        // right
        if (cell.col + 1 < matrix[0].length) {
            neighbors.push(matrix[cell.row][cell.col + 1]);
        }

        // bottom
        if (cell.row + 1 < matrix.length) {
            neighbors.push(matrix[cell.row + 1][cell.col]);
        }

        return neighbors;
    }

});