var dataset;
var w = 1100;
var h = 500;
var barPadding = 15;

d3.csv("letter_frequency.csv", function(data) {
    dataset = data;
    makeArrFreqs();
    make();
});

var letters = [];
var freqs = [];
var percents = [];

function makeArrFreqs() {
    for (var i = 0; i <= 25; i++) {
        letters[i] = Object.values(dataset[i])[0].trim();
        freqs[i] = parseInt(Object.values(dataset[i])[1].trim());
        percents[i] = parseFloat(Object.values(dataset[i])[2].trim());
    }
}

function make() {
  var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

  svg.selectAll("rect")
    .data(percents)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return i * (w / percents.length) + 25;
    })
    .attr("y", function(d) {
      return 480 - (d * 37);
    })
    .attr("fill", "blue")
    .attr("width", w / percents.length - barPadding)
    .attr("height", function(d) {
       return d * 37;
    })

  var yScale = d3.scaleLinear()
       .domain([0, d3.max(percents, function(d) { return d; })])
       .range([h - barPadding, barPadding]);

 var yAxis = d3.axisLeft()
       .scale(yScale)
       .ticks(15);

  svg.selectAll("text")
     .data(letters)
     .enter()
     .append("text")
     .text(function(d) {
       return d;
      })
     .attr("x", function(d, i) {
        return i * (w / 26) + 34;
     })
     .attr("y", function(d) {
        return h;
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "13px")
     .attr("fill", "black");

  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + (barPadding + 4) + ",-6)")
      .call(yAxis);
}
