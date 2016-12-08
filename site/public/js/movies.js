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

		var fillScale=d3.scaleLinear()
			.domain([0,5])
			.range(["lightgray","black"]);

		var n=0;

		for (var x in data[0]){
			if (x != "day"){
				var movieArea=d3.area()
						.x(function(d){return xScale(d.day);})
						//.y0(function(d){return yScale(d[x]);})
						//.y1(function(d){return yScale(-d[x]);})
						//.y0(function(d){return yScale(simpleStacking(d,x));})
						//.y1(function(d){return yScale(simpleStacking(d,x)-d[x]);})
						.y0(function(d){return yScale(alternatingStacking(d,x,"top"));})
						.y1(function(d){return yScale(alternatingStacking(d,x,"bottom"));})
						.curve(d3.curveBasis);
				d3.select("svg")
					.append("path")
					.style("id", x+"Area")
					.attr("d", movieArea(data))
					.attr("fill",fillScale(n))
					.attr("stroke","none")
					.attr("stroke-width",2)
					.style("opacity", .5);

				n++;

			};
		};

		function simpleStacking(incomingData, incomingAttribute){
			var newHeight=0;
			for(var x in incomingData){
				if(x !="day"){
					newHeight +=parseInt(incomingData[x]);
					if (x===incomingAttribute){
						break;
					}
				}
			}
			return newHeight;
		};

		function alternatingStacking(incomingData,incomingAttribute,topBottom){
			var newHeight=0;
			var skip=true;
			for (var x in incomingData){
				if(x !="day"){
					if(x==="movie1" || skip === false){
						newHeight += parseInt(incomingData[x]);
						if (x===incomingAttribute){
							break;
						}
						if (skip===false){
							skip=true;
						} else {
							n%2===0 ? skip=false : skip=true;
						}
					} else {
						skip =false;
					}
				}
			}
			if(topBottom==="bottom"){
				newHeight = -newHeight;
			}
			if (n>1&&n%2===1 && topBottom==="bottom"){
				newHeight=0;
			}
			if (n>1&&n%2===0 && topBottom==="top"){
				newHeight=0;
			}
			return newHeight;
		};
	};


}