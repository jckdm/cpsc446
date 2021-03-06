var dataset;
var w = 560;
var h = 550;

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

  var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("id", "bg");

      xScale = d3.scaleTime()
          .domain([300, 460])
          .range([0, w]);

      yScale = d3.scaleLinear()
          .domain([0, d3.max(dataset, function(d) { return d.average; })])
          .range([h, 0]);

      line = d3.line()
          .defined(function(d) { return d.average >= 0; })
          .x(function(d, i) { return h/2 + radScale(xScale(d.average)) * Math.cos((i + 2) * (Math.PI * 2)/12); })
          .y(function(d, i) { return h/2 + radScale(xScale(d.average)) * Math.sin((i + 2) * (Math.PI * 2)/12); });

      radScale = d3.scaleLinear()
          .domain([0, d3.max(dataset, function(d) { return d.average; })])
          .range([0, h/2]);

      thetaScale = d3.scaleTime()
          .domain([ d3.min(dataset, function(d) { return d.date; }),
                    d3.max(dataset, function(d) { return d.date; })
                  ])
          .range([0, Math.PI * 2]);

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

      svg.append("line")
          .attr("class", "line")
          .attr("id", "gray")
          .attr("x1", 275)
          .attr("y1", 275)
          .attr("x2", 537)
          .attr("y2", 275);

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 275)
          .attr("x2", 275)
          .attr("y2", 275);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "middle")
          .attr("x", 12)
          .attr("y", 287)
          .text("July");

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "left")
          .attr("x", 537)
          .attr("y", 275)
          .text("Jan.");

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "middle")
          .attr("x", 275)
          .attr("y", 13)
          .text("Oct.");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "gray")
          .attr("x1", 275)
          .attr("y1", 13)
          .attr("x2", 275)
          .attr("y2", 537);

    svg.append("text")
        .attr("id", "text")
        .attr("text-anchor", "middle")
        .attr("x", 275)
        .attr("y", 539)
        .text("Apr.");

    svg.append("text")
        .attr("id", "text")
        .attr("text-anchor", "middle")
        .attr("x", 142)
        .attr("y", 505)
        .text("May");

    svg.append("text")
        .attr("id", "text")
        .attr("text-anchor", "middle")
        .attr("x", 50)
        .attr("y", 145)
        .text("Aug.");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "gray")
          .attr("x1", 50)
          .attr("y1", 145)
          .attr("x2", 500)
          .attr("y2", 405);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "right")
          .attr("x", 500)
          .attr("y", 405)
          .text("Feb.");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "gray")
          .attr("x1", 145)
          .attr("y1", 500)
          .attr("x2", 405)
          .attr("y2", 50);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "middle")
          .attr("x", 405)
          .attr("y", 50)
          .text("Nov.");

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "middle")
          .attr("x", 145)
          .attr("y", 50)
          .text("Sept.");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "gray")
          .attr("x1", 145)
          .attr("y1", 50)
          .attr("x2", 405)
          .attr("y2", 500);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "middle")
          .attr("x", 405)
          .attr("y", 500)
          .text("Mar.");

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "middle")
          .attr("x", 45)
          .attr("y", 405)
          .text("June");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "gray")
          .attr("x1", 50)
          .attr("y1", 405)
          .attr("x2", 500)
          .attr("y2", 145);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "right")
          .attr("x", 500)
          .attr("y", 145)
          .text("Dec.");

      svg.append("path")
          .datum(dataset)
          .attr("class", "line")
          .attr("id", "blu")
          .attr("d", line);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "right")
          .attr("x", 318)
          .attr("y", 275)
          .text("'60");

      svg.append("circle")
          .attr("id", "pt")
          .attr("r", 3)
          .attr("cx", 315)
          .attr("cy", 275);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "right")
          .attr("x", 340)
          .attr("y", 275)
          .text("'70");

      svg.append("circle")
          .attr("id", "pt")
          .attr("r", 3)
          .attr("cx", 337)
          .attr("cy", 275);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "right")
          .attr("x", 370)
          .attr("y", 275)
          .text("'80");

      svg.append("circle")
          .attr("id", "pt")
          .attr("r", 3)
          .attr("cx", 367)
          .attr("cy", 275);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "right")
          .attr("x", 404)
          .attr("y", 275)
          .text("'90");

      svg.append("circle")
          .attr("id", "pt")
          .attr("r", 3)
          .attr("cx", 401)
          .attr("cy", 275);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "right")
          .attr("x", 441)
          .attr("y", 275)
          .text("'00");

      svg.append("circle")
          .attr("id", "pt")
          .attr("r", 3)
          .attr("cx", 438)
          .attr("cy", 275);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "right")
          .attr("x", 487)
          .attr("y", 275)
          .text("'10");

      svg.append("circle")
          .attr("id", "pt")
          .attr("r", 3)
          .attr("cx", 484)
          .attr("cy", 275);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "left")
          .attr("x", 1)
          .attr("y", 273)
          .text("300");

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "left")
          .attr("x", 1)
          .attr("y", 340)
          .text("330");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 343)
          .attr("x2", 275)
          .attr("y2", 343);

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 547)
          .attr("x2", 275)
          .attr("y2", 547);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "left")
          .attr("x", 1)
          .attr("y", 410)
          .text("360");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 480)
          .attr("x2", 275)
          .attr("y2", 480);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "left")
          .attr("x", 1)
          .attr("y", 477)
          .text("390");

      svg.append("line")
          .attr("class", "line")
          .attr("id", "dark")
          .attr("x1", 0)
          .attr("y1", 412.5)
          .attr("x2", 275)
          .attr("y2", 412.5);

      svg.append("text")
          .attr("id", "text")
          .attr("text-anchor", "left")
          .attr("x", 1)
          .attr("y", 543)
          .text("420");
    }
