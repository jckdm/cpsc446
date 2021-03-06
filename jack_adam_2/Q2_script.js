var dataset;
var w = 1100;
var h = 600;

d3.csv("mlb.csv", function(data) {
    dataset = data;
    makeArrays();
    make();
});

var tL = [[],[]];
var pWa = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var pWn = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var pW = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

var both = [pWa, pWn];

function makeArrays() {
  var na = 0;
  var nx = 0;
  for (var i = 0; i <= 29; i++) {
      tL[0][i] = Object.values(dataset[i])[0];
      tL[1][i] = Object.values(dataset[i])[1];
      pW[i][0] = parseFloat(Object.values(dataset[i])[2]);
      pW[i][1] = parseInt(Object.values(dataset[i])[3]);
      if ((Object.values(dataset[i])[1]) === "A") {
        pWa[na][0] = parseFloat(Object.values(dataset[i])[2]);
        pWa[na][1] = parseInt(Object.values(dataset[i])[3]);
        na += 1;
      }
      else {
        pWn[nx][0] = parseFloat(Object.values(dataset[i])[2]);
        pWn[nx][1] = parseInt(Object.values(dataset[i])[3]);
        nx += 1;
      }
    }
}

function make() {
  var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

        var padding = 40;

        var xScale = d3.scaleLinear()
             .domain([0, d3.max(pW, function(d) { return d[0]; })])
             .range([padding, w - padding]);

        var yScale = d3.scaleLinear()
             .domain([0, d3.max(pW, function(d) { return d[1]; })])
             .range([h - padding, padding]);

        var xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(10);

        var yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(10);

        svg.selectAll("circle")
          .data(pWa)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            return xScale(d[0]);
          })
          .attr("cy", function(d) {
            return yScale(d[1]);
          })
          .attr("r", 4)
          .attr("class", "purplecircle");

        svg.selectAll("body")
          .data(pWn)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            return xScale(d[0]);
          })
          .attr("cy", function(d) {
            return yScale(d[1]);
          })
          .attr("r", 4)
          .attr("class", "goldcircle");

        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);

        svg.append("text")
            .attr("x", 550 )
            .attr("y", h - 5 )
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Payroll (millions of USD)");

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x", -300)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Wins (games)");

        svg.append("text")
            .attr("x", 1000)
            .attr("y", 450)
            .attr("class", "purplecircle")
            .style("font-size", "12px")
            .text("American League");

        svg.append("text")
            .attr("x", 1000)
            .attr("y", 465)
            .attr("class", "goldcircle")
            .style("font-size", "12px")
            .text("National League");
      }
