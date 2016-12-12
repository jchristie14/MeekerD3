"use strict";

function dataViz(){
	
	var pieChart=d3.pie();
	var yourPie=pieChart([1,1,2]);
	
	var newArc=d3.arc();
	newArc.innerRadius(0).outerRadius(100)

	var fillScale=d3.scaleOrdinal()
		.range(["#fcd88a","#cf7c1c","#93c464","#75734f"])



	d3.select("svg")
		.append("g")
		.attr("transform", "translate(250,250)")
		.selectAll("path")
		.data(yourPie)
		.enter()
		.append("path")
		.attr("d",newArc)
		.style("fill", (d,i)=> fillScale(i))
		.style("opacity", .5)
		.style("stroke","black")
		.style("stroke-width","2px");



}