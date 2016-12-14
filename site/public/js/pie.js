"use strict";

function dataViz(){
	
	// var pieChart=d3.pie();
	// var yourPie=pieChart([1,1,2]);
	
	// var newArc=d3.arc();
	// newArc.innerRadius(0).outerRadius(100)

	var fillScale=d3.scaleOrdinal()
		.range(["#fcd88a","#cf7c1c","#93c464","#75734f"])

	d3.json("tweets.json", pieChart)

		function pieChart(data){
			var nestedTweets=d3.nest()
				.key(d=>d.user)
				.entries(data.tweets);
			nestedTweets.forEach(d=>{
				d.numTweets=d.values.length;
				d.numFavorites=d3.sum(d.values, p=>p.favorites.length)
				d.numRetweets=d3.sum(d.values, p=>p.retweets.length)
			});

			var pieChart=d3.pie();

			var newArc=d3.arc();
			newArc
				.innerRadius(20)
				.outerRadius(100)

			pieChart.value(d=>d.numTweets);

			var yourPie=pieChart(nestedTweets);

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

	pieChart.value(d=>d.numFavorites)
	d3.selectAll("path").data(pieChart(nestedTweets))
		.transition()
		.duration(1000)
		.attr("d", newArc);

		}

}