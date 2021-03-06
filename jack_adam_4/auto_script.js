var dataset;
var w = 1000;
var h = 600;

function capitalize(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   return splitStr.join(' ');
 }

var rowConverter = function(d) {
  return {
    mpg: parseInt(d.mpg),
    cylinders: parseInt(d.cylinders),
    displacement: parseInt(d.displacement),
    horsepower: parseInt(d.horsepower),
    weight: parseInt(d.weight),
    acceleration: parseFloat(d.acceleration),
    model: d.model
  };
}

d3.csv("auto-mpg.csv", rowConverter, function(data) {
    dataset = data;
    make();
});

var padding = 30;

function make() {

var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      var ga = d3.select("svg").append("g").attr("id","a");

      var xScale = d3.scaleLinear()
          .domain([ d3.min(dataset, function(d) { return d.horsepower; }) - 10,
                    d3.max(dataset, function(d) { return d.horsepower; }) + 5
                  ])
          .range([padding - 5, w - padding - 300]);

      var yScale = d3.scaleLinear()
        .domain([ d3.min(dataset, function(d) { return d.mpg; }) - 1,
                  d3.max(dataset, function(d) { return d.mpg; }) + 1
                ])
        .range([h - padding, padding]);

      svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.horsepower); })
            .attr("cy", function(d) { return yScale(d.mpg); })
            .attr("fill", "black")
            .attr("stroke", "white")
            .attr("stroke-width", "1")
            .attr("r", function(d) { return (d.weight / 350); })
            .append("title")
            .text(function(d) { return capitalize(d.model); });

        var xAxis = d3.axisBottom()
             .scale(xScale)
             .ticks(25);

        var yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(30)
              .tickFormat(d3.format("d"));

         svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(10," + (h - padding) + ")")
           .call(xAxis);

         svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (padding + 5) + ",0)")
            .call(yAxis);

        svg.append("text")
            .attr("y", 25)
            .attr("x", 735)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("5");

        svg.append("text")
            .attr("y", 25)
            .attr("x", 795)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("14");

        svg.append("text")
            .attr("y", 25)
            .attr("x", 855)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("23");

        svg.append("text")
            .attr("y", 598)
            .attr("x", 380)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Horsepower");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -3)
            .attr("x", -270)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("MPG");

        d3.select("input")
            .on("input", function() {
              var threshold = +d3.select(this).node().value;
              svg.selectAll("circle")
                  .attr("fill", "black")
                  .filter(function(d) { return d.acceleration <= threshold; })
                  .attr("fill", "red");
              ga.selectAll("text")
                  .attr("fill", "black")
                  .filter(function(d) { return d.acceleration <= threshold; })
                  .attr("fill", "red");
            });

        var labels = ga.selectAll(null)
          .data(dataset)
          .enter()
          .append("text")
          .attr("x", 730)
          .attr("font-size", 13)
          .attr("y", function(d, i) { return 85 + i * 25; })
          .text(function(d) { return capitalize(d.model); })
    }
