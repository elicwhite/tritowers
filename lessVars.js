/**
 * Found from: https://raw.github.com/gist/2948738/5f8e9c557996332181617660660173756871bad5/getLessVars.js
 * 
 * getLessVars parses your LESS variables to Javascript (provided you make a dummy node in LESS)
 *
 * @param {String} id The css-id your variables are listed under.
 * @param {Boolean} [parseNumbers=true] Try to parse units as numbers.
 * @return {Object} A value object containing your LESS variables.
 * @example
 * less:
 *	@foo: 123px;
 *	#less { myFoo: @foo; }
 *	javascript:
 *	getLessVars('less');
 * returns:
 *	{myFoo:123}
 */

function getLessVars(id, parseNumbers) {
	var bNumbers = parseNumbers === undefined ? true : parseNumbers,
		oLess = {}, rgId = /\#\w+/,
		rgKey = /\.(\w+)/,
		rgUnit = /[a-z]+$/,
		aUnits = 'em,ex,ch,rem,vw,vh,vmin,cm,mm,in,pt,pc,px,deg,grad,rad,turn,s,ms,Hz,kHz,dpi,dpcm,dppx'.split(','),
		rgValue = /:\s?(.*)\s?;\s?\}/,
		sId = '#' + id,
		oStyles = document.styleSheets;
	for (var i = 0, l = oStyles.length; i < l; i++) {
		var oRules = oStyles[i].cssRules;
		for (var j = 0, k = oRules.length; j < k; j++) {
			var sRule = oRules[j].cssText,
				aMatchId = sRule.match(rgId);
			if (aMatchId && aMatchId[0] == sId) {
				var aKey = sRule.match(rgKey),
					aVal = sRule.match(rgValue);
				if (aKey && aVal) {
					var sKey = aKey[1],
						oVal = aVal[1],
						aUnit = oVal.match(rgUnit);
					if (bNumbers && aUnit && aUnits.indexOf(aUnit[0]) !== -1) {
						oVal = parseFloat(oVal);
					}
					oLess[sKey] = oVal;
				}
			}
		}
	}
	return oLess;
}