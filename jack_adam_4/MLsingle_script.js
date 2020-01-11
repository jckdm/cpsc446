var dataset;
var w = 575;
var h = 550;

var yr = [];
yr.length = 708;

for (var i = 0; i < 708; i++) {
  var year = String((i + 58) % 100);
  if (year.length == 1) { yr[i * 12] = "'0" + year; }
  else { yr[i * 12] = "'" + year;}
}

// Murray, ch. 11, example 05
var rowConverter = function(d) {
  return {
    date: new Date(+d.year, (+d.month - 1)),  //Make a new Date object for each year + month
    average: parseFloat(d.average)  //Convert from string to float
  };
}

d3.csv("mauna_loa_co2_monthly_averages.csv", rowConverter, function(data) {
    dataset = data;
    make();
});

function make() {

  console.log(dataset);

  var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("id", "bg");

      xScale = d3.scaleTime()
          .domain([
                  d3.min(dataset, function(d) { return d.date; }),
                  d3.max(dataset, function(d) { return d.date; })
                  ])
          .range([0, w]);

      yScale = d3.scaleLinear()
          .domain([0, d3.max(dataset, function(d) { return d.average; })])
          .range([h, 0]);

      line = d3.line()
          .defined(function(d) { return d.average >= 0; })
          .x(function(d) { return h/2 + radScale(d.average) * Math.cos(thetaScale(d.date)); })
          .y(function(d) { return h/2 + radScale(d.average) * Math.sin(thetaScale(d.date)); });

      thetaScale = d3.scaleTime()
          .domain([
                  d3.min(dataset, function(d) { return d.date; }),
                  d3.max(dataset, function(d) { return d.date; })
                  ])
          .range([0, Math.PI * 2]);

      radScale = d3.scaleLinear()
          .domain([0, d3.max(dataset, function(d) { return d.average; })])
          .range([0, h/2]);

      svg.append("circle")
          .attr("id", "gray")
          .attr("r", 70)
          .attr("cx", 275)
          .attr("cy", 275);

      svg.append("circle")
          .attr("id", "gray")
          .attr("r", 140)
          .attr("cx", 275)
          .attr("cy", 275);

      svg.append("circle")
          .attr("id", "gray")
          .attr("r", 202)
          .attr("cx", 275)
          .attr("cy", 275);

      svg.append("circle")
          .attr("id", "gray")
          .attr("r", 272)
          .attr("cx", 275)
          .attr("cy", 275);

      svg.selectAll("line")
          .data(dataset)
          .enter()
          .append("line")
          .attr("class", "line")
          .attr("id", "gray")
          .attr("x1", function(d, i) { if (i % 12 == 0) { return 275; } })
          .attr("y1", function(d, i) { if (i % 12 == 0) { return 275; } })
          .attr("x2", function(d, i) {
            if (i % 12 == 0) {
              if (d.average <= 0) { return 450; }
              else {
                return h/2 + radScale(d.average) * Math.cos(thetaScale(d.date));
            }}})
          .attr("y2", function(d, i) {
            if (i % 12 == 0) {
              if (d.average <= 0) { return 400; }
              else {
                return h/2 + radScale(d.average) * Math.sin(thetaScale(d.date));
            }}});

      svg.append("path")
          .datum(dataset)
          .attr("class", "line")
          .attr("id", "blu")
          .attr("d", line);

      svg.selectAll("text")
          .data(dataset)
          .enter()
          .append("text")
          .attr("id", "text")
          .attr("text-anchor", "middle")
          .attr("x", function(d, i) {
            if (i % 12 == 0) {
              if (d.average <= 0) { return 460; }
              else {
                return h/2 + radScale(d.average + 18) * Math.cos(thetaScale(d.date));
            }}})
          .attr("y", function(d, i) {
            if (i % 12 == 0) {
              if (d.average <= 0) { return 412; }
              else {
                return h/2 + radScale(d.average + 18) * Math.sin(thetaScale(d.date));
            }}})
          .text(function(d, i) { return yr[i]; });

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 275)
          .attr("x2", 275)
          .attr("y2", 275);

      svg.append("text")
          .attr("id", "text")
          .attr("x", 1)
          .attr("y", 270)
          .text("0");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 345)
          .attr("x2", 275)
          .attr("y2", 345);

      svg.append("text")
          .attr("id", "text")
          .attr("x", 1)
          .attr("y", 340)
          .text("100");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 415)
          .attr("x2", 275)
          .attr("y2", 415);

      svg.append("text")
          .attr("id", "text")
          .attr("x", 1)
          .attr("y", 410)
          .text("200");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 477)
          .attr("x2", 275)
          .attr("y2", 477);

      svg.append("text")
          .attr("id", "text")
          .attr("x", 1)
          .attr("y", 472)
          .text("300");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 547)
          .attr("x2", 275)
          .attr("y2", 547);

      svg.append("text")
          .attr("id", "text")
          .attr("x", 1)
          .attr("y", 542)
          .text("400");
    }
