var w = 715;
var h = 715;

var xy = []
for (var i = 0; i <= 12; i++) { xy[i] = -3 + (0.5 * i); }

var svg = d3.select("body")
       .append("svg")
       .attr("width", w)
       .attr("height", h);

var ga = d3.select("svg").append("g").attr("id","a");
var gb = d3.select("svg").append("g").attr("id","b");

svg.append("text")
    .attr("x", 640)
    .attr("y", 130)
    .attr("id", "bartext")
    .text("0.1");

svg.append("text")
    .attr("x", 640)
    .attr("y", 77)
    .attr("id", "bartext")
    .text("0.5");

svg.append("text")
    .attr("x", 640)
    .attr("y", 15)
    .attr("id", "bartext")
    .text("1.0");

// vertical
for (var i=0; i<=h-140; i+=45) {
   svg.append("line")
        .attr("x1", i)
        .attr("y1", 0)
        .attr("x2", i)
        .attr("y2", h-175)
        .attr("class", "line")
};
svg.selectAll("gb")
    .data(xy)
    .enter()
    .append("text")
    .attr("id", "text")
    .style("font-weight", function(d, i) { if (i % 2 == 0) { return "bold"; }})
    .attr("x", function(d,i) { return (i * 44.5); })
    .attr("y", h-150)
    .text(function(d,i) { return xy[i]; });

// horizontal
for (var j=0; j<=w-140; j+=45) {
   svg.append("line")
        .attr("x1", 0)
        .attr("y1", j)
        .attr("x2", w-175)
        .attr("y2", j)
        .attr("class", "line");
};
svg.selectAll("ga")
    .data(xy)
    .enter()
    .append("text")
    .attr("id", "text")
    .attr("x", w-160)
    .style("font-weight", function(d, i) { if (i % 2 == 0) { return "bold"; }})
    .attr("y", function(d,i) { return (-i * 44.5 + h/1.322); })
    .text(function(d,i) { return xy[i]; });

function update() {
    var div = document.getElementById('title');
    var step = document.getElementById('slider').value;
    div.innerHTML = "Euler Integration, step = " + step;

    ga.selectAll("line").remove();
    ga.selectAll("circle").remove();

    var counter = 0;
    var x = 0;
    var y = -1;
    var xvec, yvec = 0;

    do {
      ga.append("circle")
          .attr("cx", (x*90)+270)
          .attr("cy", (y*-90)+270)
          .attr("r", 5)
          .style("fill", "black");

      var tempx = x;
      var tempy = y;
      xvec = -y;
      yvec = x/2;
      x += xvec * step;
      y += yvec * step;

      ga.append("line")
          .attr("x1", (x*90)+270)
          .attr("y1", (y*-90)+270)
          .attr("x2", (tempx*90)+270)
          .attr("y2", (tempy*-90)+270)
          .attr("class", "line")
          .attr("id", "dark");
    }
    while (x <= 0 || y >= -1);

    ga.append("circle")
        .attr("cx", (x*90)+270)
        .attr("cy", (y*-90)+270)
        .attr("r", 5)
        .style("fill", "black");
    }
