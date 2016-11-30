"use strict";

(function(){


	var testArray = [88,10000,1,75,12,35];

	console.log(d3.extent(testArray, function(el) {return el}));

	d3.csv("cities.csv",function(error,data) {dataViz(data);});
	function dataViz(incomingData) {
		d3.select("body").selectAll("div.cities")
			.data(incomingData)
			.enter()
			.append("div")
			.attr("class","cities")
			.html(function(d,i) { return d.label; });
	}
})();