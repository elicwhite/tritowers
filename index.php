<!DOCTYPE html>
<html>
<head>
<title>Tri-Towers</title>
<link type="text/css" rel="stylesheet" href="styles.css"></style>
<script src="closure-library/closure/goog/base.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script src="AStar.js"></script>
<script src="Board.js"></script>
<script src="Tower.js"></script>
<script src="CreepManager.js"></script>
<script src="creep.js"></script>
<script src="search.js"></script>
</head>
<body>
	<h1> Tri-Towers!</h1>
	<p>
		Create blocks, when you have three or more blocks of the same level touching, the last block
will turn into one of a higher level and the rest will go away. 
		<br />
		Build a path of high level blocks!
	</p>
    <div id="box">

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
