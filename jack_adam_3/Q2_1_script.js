var dataset;
var w = 700;
var h = 700;

d3.csv("testp2.csv", function(data) {
    dataset = data;
    make();
});

var arr = [];
arr.length = 10000;

for (var i = 0; i < 10000; i++) {
  arr[i] = [];
  arr[i].length = 3;
}

function make() {
    for (var i = 0; i < 10000; i++) {
        arr[i][0] = parseFloat(Object.values(dataset[i])[0]);
        arr[i][1] = parseFloat(Object.values(dataset[i])[1]);
        arr[i][2] = parseFloat(Object.values(dataset[i])[2]);
    }

var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      var padding = 40;

      var xScale = d3.scaleLinear()
           .domain([0, d3.max(arr, function(d) { return d[0]; })])
           .range([padding, w - padding]);

      var yScale = d3.scaleLinear()
           .domain([0, d3.max(arr, function(d) { return d[1]; })])
           .range([h - padding, padding]);

      var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(20);

      var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(20);

      svg.selectAll("circle")
        .data(arr)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return xScale(d[0]);
        })
        .attr("cy", function(d) {
          return yScale(d[1]);
        })
        .attr("r", 3)
        .attr("class", function(d) {
            if (d[2] < 3.33) {
              return "purplecircle";
            }
            if (d[2] > 3.33 && d[2] < 6.66) {
              return "goldcircle";
            }
            else {
              return "blackcircle";
            }
          })
        .append("title")
        .text(function(d) {
           return d[0] + ", " + d[1];
        });

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);
    }
