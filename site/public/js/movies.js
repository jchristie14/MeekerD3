"use strict";

function dataViz(){

	d3.csv("movies.csv", lineChart);

	function lineChart(data){

		var xScale=d3.scaleLinear().domain([-10,10]).range([20,470]);
		var yScale=d3.scaleLinear().domain([-35,35]).range([480,20]);

		d3.select("svg")
			.append("g")
			.attr("id","yAxisG")
			.call(d3.axisRight(yScale).ticks(10).tickSize(480));

		d3.select("svg")
			.append("g")
			.attr("id","xAxisG")
			.call(d3.axisBottom(xScale).tickValues([1,2,3,4,5,6,7,8,9,10]).tickSize(480));

		for (var x in data[0]){
			if (x != "day"){
				var movieArea=d3.area()
						.x(function(d){return xScale(d.day);})
						.y0(function(d){return yScale(d[x]);})
						.y1(function(d){return yScale(-d[x]);})
						.curve(d3.curveCardinal);
				d3.select("svg")
					.append("path")
					.style("id", x+"Area")
					.attr("d", movieArea(data))
					.attr("fill","darkgray")
					.attr("stroke","lightgray")
					.attr("stroke-width",2)
					.style("opacity", .5);

			};
		};
	};


}