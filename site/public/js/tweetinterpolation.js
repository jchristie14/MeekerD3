"use strict";

function dataViz(){

	d3.csv("tweetdata.csv", lineChart);

	function lineChart(data){
		
		var xScale=d3.scaleLinear().domain([1,10.5]).range([20,480]);
		var yScale=d3.scaleLinear().domain([0,35]).range([480,20]);

		d3.select("svg")
			.append("g")
			//.attr("transform","translate(470,0)")
			.attr("id","yAxisG")
			.call(d3.axisRight(yScale).ticks(10).tickSize(480));

		d3.select("svg")
			.append("g")
			//.attr("transform","translate(0,480)")
			.attr("id","xAxisG")
			.call(d3.axisBottom(xScale).tickValues([1,2,3,4,5,6,7,8,9,10]).tickSize(480));

		d3.select("svg")
			.selectAll("circle.tweets")
			.data(data)
			.enter()
			.append("circle")
			.attr("class","tweets")
			.attr("r",5)
			.attr("cx", function(d){return xScale(d.day)})
			.attr("cy", function(d){return yScale(d.tweets)})
			.style("fill","black");

		d3.select("svg")
			.selectAll("circle.retweets")
			.data(data)
			.enter()
			.append("circle")
			.attr("class","retweets")
			.attr("r",5)
			.attr("cx", function(d){return xScale(d.day)})
			.attr("cy", function(d){return yScale(d.retweets)})
			.style("fill", "lightgray");

		d3.select("svg")
			.selectAll("circle.favorites")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", "favorites")
			.attr("r",5)
			.attr("cx", function(d){return xScale(d.day)})
			.attr("cy", function(d){return yScale(d.favorites)})
			.style("fill","gray");

		var tweetLine=d3.line()
			.x(function(d){return xScale(d.day);})
			.y(function(d){return yScale(d.tweets);});

		var retweetLine=d3.line()
			.x(function(d){return xScale(d.day);})
			.y(function(d){return yScale(d.retweets);});
			

		var favLine=d3.line()
			.x(function(d){return xScale(d.day);})
			.y(function(d){return yScale(d.favorites);});

		d3.select("svg")
			.append("path")
			.attr("d", tweetLine(data))
			.attr("fill","none")
			.attr("stroke","darkred")
			.attr("stroke-width",2);

		d3.select("svg")
			.append("path")
			.attr("d", retweetLine(data))
			.attr("fill","none")
			.attr("stroke","gray")
			.attr("stroke-width",2);

		d3.select("svg")
			.append("path")
			.attr("d", favLine(data))
			.attr("fill","none")
			.attr("stroke","black")
			.attr("stroke-width",2);

	};

};