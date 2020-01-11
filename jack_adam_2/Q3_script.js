var dataset;
var w = 700;
var h = 625;

d3.csv("cs_courses.csv", function(data) {
    dataset = data;
    makeArrays();
    make();
});

var c = [[],[]];

var oneone = 0, onetwo = 0, onethree = 0, onefour = 0, onefive = 0;
var twoone = 0, twotwo = 0, twothree = 0, twofour = 0, twofive = 0;
var threeone = 0, threetwo = 0, threethree = 0, threefour = 0, threefive = 0;
var fourone = 0, fourtwo = 0, fourthree = 0, fourfour = 0, fourfive = 0;
var fiveone = 0, fivetwo = 0, fivethree = 0, fivefour = 0, fivefive = 0;

var percents = [];

function makeArrays() {
  for (var i = 0; i <= 24; i++) {
      c[0][i] = Math.round(parseFloat(Object.values(dataset[i])[1]));
      c[1][i] = Math.round(parseFloat(Object.values(dataset[i])[2]));
    }
  for (var j = 0; j <= 24; j++) {
      var cr = c[0][j];
      var wr = c[1][j];

      if (cr == 1 && wr == 1) { oneone++; }
      if (cr == 1 && wr == 2) { onetwo++; }
      if (cr == 1 && wr == 3) { onethree++; }
      if (cr == 1 && wr == 4) { onefour++; }
      if (cr == 1 && wr == 5) { onefive++; }

      if (cr == 2 && wr == 1) { twoone++; }
      if (cr == 2 && wr == 2) { twotwo++; }
      if (cr == 2 && wr == 3) { twothree++; }
      if (cr == 2 && wr == 4) { twofour++; }
      if (cr == 2 && wr == 5) { twofive++; }

      if (cr == 3 && wr == 1) { threeone++; }
      if (cr == 3 && wr == 2) { threetwo++; }
      if (cr == 3 && wr == 3) { threethree++; }
      if (cr == 3 && wr == 4) { threefour++; }
      if (cr == 3 && wr == 5) { threefive++; }

      if (cr == 4 && wr == 1) { fourone++; }
      if (cr == 4 && wr == 2) { fourtwo++; }
      if (cr == 4 && wr == 3) { fourthree++; }
      if (cr == 4 && wr == 4) { fourfour++; }
      if (cr == 4 && wr == 5) { fourfive++; }

      if (cr == 5 && wr == 1) { fiveone++; }
      if (cr == 5 && wr == 2) { fivetwo++; }
      if (cr == 5 && wr == 3) { fivethree++; }
      if (cr == 5 && wr == 4) { fivefour++; }
      if (cr == 5 && wr == 5) { fivefive++; }
    }
  percents[0] = Math.round((onefive / 26) * 100);
  percents[1] = Math.round((twofive / 26) * 100);
  percents[2] = Math.round((threefive / 26) * 100);
  percents[3] = Math.round((fourfive / 26) * 100);
  percents[4] = Math.round((fivefive / 26) * 100);
  percents[5] = Math.round((onefour / 26) * 100);
  percents[6] = Math.round((twofour / 26) * 100);
  percents[7] = Math.round((threefour / 26) * 100);
  percents[8] = Math.round((fourfour / 26) * 100);
  percents[9] = Math.round((fivefour / 26) * 100);
  percents[10] = Math.round((onethree / 26) * 100);
  percents[11] = Math.round((twothree / 26) * 100);
  percents[12] = Math.round((threethree / 26) * 100);
  percents[13] = Math.round((fourthree / 26) * 100);
  percents[14] = Math.round((fivethree / 26) * 100);
  percents[15] = Math.round((onetwo / 26) * 100);
  percents[16] = Math.round((twotwo / 26) * 100);
  percents[17] = Math.round((threetwo / 26) * 100);
  percents[18] = Math.round((fourtwo / 26) * 100);
  percents[19] = Math.round((fivetwo / 26) * 100);
  percents[20] = Math.round((oneone / 26) * 100);
  percents[21] = Math.round((twoone / 26) * 100);
  percents[22] = Math.round((threeone / 26) * 100);
  percents[23] = Math.round((fourone / 26) * 100);
  percents[24] = Math.round((fiveone / 26) * 100);
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
          if (i <= 4) {
            return i * 110;
          }
          if (i >= 5 && i < 10) {
            return ((i * 110) - 550);
          }
          if (i >= 10 && i < 15) {
            return ((i * 110) - 1100);
          }
          if (i >= 15 && i < 20) {
            return ((i * 110) - 1650);
          }
          if (i >= 20 && i < 25) {
            return ((i * 110) - 2200);
          }
        })
        .attr("y", function(d, i) {
          if (i <= 4) {
            return 0;
          }
          if (i >= 5 && i < 10) {
            return 110;
          }
          if (i >= 10 && i < 15) {
            return 220;
          }
          if (i >= 15 && i < 20) {
            return 330;
          }
          if (i >= 20 && i < 25) {
            return 440;
          }
        })
        .attr("class", "blue")
        .attr("opacity", function(d) {
          if (d == 0) {
            return 0.025;
          }
          else {
            return (d / 100) + 0.025;
          }
        })

    svg.selectAll("text")
      .data(percents)
      .enter()
      .append("text")
      .attr("x", function(d, i) {
        if (i <= 4) {
          return i * 112;
        }
        if (i >= 5 && i < 10) {
          return ((i * 112) - 560);
        }
        if (i >= 10 && i < 15) {
          return ((i * 112) - 1120);
        }
        if (i >= 15 && i < 20) {
          return ((i * 112) - 1680);
        }
        if (i >= 20 && i < 25) {
          return ((i * 112) - 2240);
        }
      })
      .attr("y", function(d, i) {
        if (i <= 4) {
          return 20;
        }
        if (i >= 5 && i < 10) {
          return 130;
        }
        if (i >= 10 && i < 15) {
          return 240;
        }
        if (i >= 15 && i < 20) {
          return 350;
        }
        if (i >= 20 && i < 25) {
          return 460;
        }
      })
      .style("text-anchor", "left")
      .style("font-size", "12px")
      .text(function(d, i) {
        return percents[i] + "%";
      });

      svg.append("text")
          .attr("x", 50)
          .attr("y", 555 )
          .style("text-anchor", "middle")
          .style("font-size", "13px")
          .text("poor");

      svg.append("text")
          .attr("x", 160)
          .attr("y", 555 )
          .style("text-anchor", "middle")
          .style("font-size", "13px")
          .text("below average");

      svg.append("text")
          .attr("x", 270)
          .attr("y", 555 )
          .style("text-anchor", "middle")
          .style("font-size", "13px")
          .text("good");

      svg.append("text")
          .attr("x", 380)
          .attr("y", 555 )
          .style("text-anchor", "middle")
          .style("font-size", "13px")
          .text("very good");

      svg.append("text")
          .attr("x", 488)
          .attr("y", 555 )
          .style("text-anchor", "middle")
          .style("font-size", "13px")
          .text("excellent");

      svg.append("text")
          .attr("x", 225)
          .attr("y", 610 )
          .style("text-anchor", "center")
          .style("font-size", "15px")
          .style("font-weight", "bold")
          .text("Class Rating");

      svg.append("text")
          .attr("x", 560)
          .attr("y", 55 )
          .style("text-anchor", "left")
          .style("font-size", "13px")
          .text("much greater");

      svg.append("text")
          .attr("x", 560)
          .attr("y", 165 )
          .style("text-anchor", "left")
          .style("font-size", "13px")
          .text("greater");

      svg.append("text")
          .attr("x", 560)
          .attr("y", 275 )
          .style("text-anchor", "left")
          .style("font-size", "13px")
          .text("same");

      svg.append("text")
          .attr("x", 560)
          .attr("y", 385 )
          .style("text-anchor", "left")
          .style("font-size", "13px")
          .text("less");

      svg.append("text")
          .attr("x", 560)
          .attr("y", 495 )
          .style("text-anchor", "left")
          .style("font-size", "13px")
          .text("much less");

      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 660)
          .attr("x", -270)
          .style("text-anchor", "middle")
          .style("font-size", "15px")
          .style("font-weight", "bold")
          .text("Work Rating");

      svg.append("text")
          .attr("x", 0)
          .attr("y", 625)
          .style("text-anchor", "left")
          .style("font-size", "10px")
          .text("*Insufficient data for 7 courses");
}
