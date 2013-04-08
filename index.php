<!DOCTYPE html>
<html>
<head>
    <title>Tri-Towers</title>
    <link type="text/css" rel="stylesheet" href="styles.css"></style>
    <script src="closure-library/closure/goog/base.js"></script>
    <script type="text/javascript">
        goog.require('goog.structs.PriorityQueue');

        function matrixToArray(matrix) {
            return matrix.substr(12, matrix.length - 8).split(', ');
        }
    </script>

    <script data-main="scripts/main" src="scripts/require-jquery.js"></script>
</head>
<body>
	<h1> Tri-Towers!</h1>
	<p>
		Create blocks, when you have three or more blocks of the same level touching, the last block
will turn into one of a higher level and the rest will go away. 
		<br />
		Build a path of high level blocks!
	</p>
    <div id="container">
        <div id="boxBorder">
            <div id="box">

            </div>
        </div>
    </div>
    <!--
    <div class="controls">
        <fieldset>
            <label>Block <input type="radio" name="inputType" value="block"></label>
        </fieldset>
    </div>
    -->
</body>
</html>
