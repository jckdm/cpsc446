// set up svg area in body of html
var svg = d3.select("body")
		 .append("svg")
		 .attr("width",1350)
		 .attr("height",2000);

var dataset;
var arr1 = [];
var arr12 = [];
var arr2 = [];

// function to create SVG path statement from a list of points
var lineGenerator = d3.line();
var rowConverter = function(d) {
		 return {
			 Type: d.Type,
			 t5yr: parseFloat(d.t5yr),
			 t10yr: parseFloat(d.t10yr),
			 t15yr: parseFloat(d.t15yr),
			 t20yr: parseFloat(d.t20yr)
		 };
}

// EDIT PATH this path as necessary
d3.csv("cancer_survival.csv", rowConverter, function(data) {
			 dataset = data;

svg.selectAll("path")
	 .data(dataset)
	 .enter()
	 .append("path")
	 .attr('d', (function(d)
			 {return lineGenerator ([[250, (2000-20*d.t5yr)],
						 [400, (2000-20*d.t10yr)],
						 [550, (2000-20*d.t15yr)],
						 [700, (2000-20*d.t20yr)]])
								 }))
	 .attr("stroke-width", 4)
	 .attr("stroke",function(d)
		 {return ("rgba(" + parseInt(255-2*d.t5yr) + ","
					 +parseInt(2*d.t20yr) +"," +  parseInt(2*d.t5yr) + " ,0.5)")} )
	 .attr("fill", "none");

svg.selectAll("text.labels")
	 .data(dataset)
	 .enter()
	 .append("text")
	 .text(function(d) {return d.Type})
	 .attr("font-size","16px")
	 .attr("fill","black")
	 .attr("x",173)
	 .attr("font-family", "sans-serif")
	 .attr("text-anchor","end")
	 .attr("y",function(d, i) {
		 var temp = ((2000-20*d.t5yr) + 5)
		 arr1.push(temp);
		 for (var j = 0; j <= i; j++) {
			 var larger = Math.max(temp, arr1[j]);
			 var smaller = Math.min(temp, arr1[j]);
			 var diff = larger - smaller;
			 if (diff < 50 && diff != 0) { return((2000-20*d.t5yr) + 20) }
			 else { return((2000-20*d.t5yr) + 5) }
		 }
	 });

 svg.selectAll("text.values")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d) {return d.Type})
		.attr("font-size","16px")
		.attr("fill","black")
		.attr("x",760)
		.attr("font-family", "sans-serif")
		.attr("y",function(d, i) {
			for (var x = 0; x < 24; x++) {
				arr12.push((2000-20*dataset[x].t20yr) + 5);
			}
			var c = 0;
			for (var j = 0; j < 24; j++) {
				var larger = Math.max(arr12[c], arr12[j]);
				var smaller = Math.min(arr12[c], arr12[j]);
				var diff = larger - smaller;
				c += 1;
				if (diff < 50 && diff != 0) { return((2000-20*d.t20yr) + 20) }
				else { return((2000-20*d.t20yr) + 5) }
			}
		});

var label = svg.selectAll("g")
		 .data(dataset)
		 .enter()
		 .append("g")

 label.append("text")
		 .attr("x", 240)
		 .attr("y", function(d) {return((2000-20*d.t5yr) + 4)})
		 .text(function(d) {return d.t5yr})
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px");

 label.append("text")
		 .attr("x", 390)
		 .attr("y", function(d) {return((2000-20*d.t10yr) + 4)})
		 .text(function(d) {return d.t10yr})
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px");

 label.append("text")
		 .attr("x", 540)
		 .attr("y", function(d) {return((2000-20*d.t15yr) + 4)})
		 .text(function(d) {return d.t15yr})
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px");

 label.append("text")
		 .attr("x", 680)
		 .attr("y", function(d) {return((2000-20*d.t20yr) + 4)})
		 .text(function(d) {return d.t20yr})
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px");

 svg.append("text")
		 .attr("x", 235)
		 .attr("y", 10 )
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px")
		 .text("5 year");

 svg.append("text")
		 .attr("x", 383)
		 .attr("y", 10 )
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px")
		 .text("10 year");

 svg.append("text")
		 .attr("x", 530)
		 .attr("y", 10 )
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px")
		 .text("15 year");

 svg.append("text")
		 .attr("x", 672)
		 .attr("y", 10 )
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px")
		 .text("20 year");

 svg.append("text")
		 .attr("x", 235)
		 .attr("y", 1995 )
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px")
		 .text("5 year");

 svg.append("text")
		 .attr("x", 383)
		 .attr("y", 1995 )
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px")
		 .text("10 year");

 svg.append("text")
		 .attr("x", 530)
		 .attr("y", 1995 )
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px")
		 .text("15 year");

 svg.append("text")
		 .attr("x", 672)
		 .attr("y", 1995 )
		 .attr("font-family","sans-serif")
		 .style("font-size", "12px")
		 .text("20 year");
});
