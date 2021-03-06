var w = 500;
var h = 500;

// Belize, Costa Rica, El Salvador, Guatemala, Honduras, México, Nicaragua, Panamá
 var data = [
   [0,    0,    4259,  12059, 4249, 1647, 0,      0],
   [58,   0,    7922,  1335,  2301, 1717, 158565, 5727],
   [178,  471,  0,     4732,  6901, 928,  3679,   245],
   [443,  561,  14845, 0,     4550, 7210, 3971,   143],
   [125,  291,  3458,  1645,  0,    574,  2792,   124],
   [1690, 1344, 5262,  28068, 7375, 0,    2876,   901],
   [11,   5299, 1112,  827,   6368, 465,  0,      177],
   [30,   4072, 1623,  702,   789,  2198, 7564,   0]
 ];

 var svg = d3.select("body")
      .append("svg")
      .attr("viewBox", [-w/2, -h/2, w, h])

  svg.append("text")
     .attr("x", 35)
     .attr("y", -220)
     .attr("id", "text")
     .text("Belize");

  svg.append("text")
      .attr("x", 210)
      .attr("y", -65)
      .attr("id", "text")
      .text("Costa Rica");

  svg.append("text")
     .attr("x", -150)
     .attr("y", 195)
     .attr("id", "text")
     .text("El Salvador");

   svg.append("text")
      .attr("x", -225)
      .attr("y", 115)
      .attr("id", "text")
      .text("Guatemala");

  svg.append("text")
      .attr("x", -250)
      .attr("y", 20)
      .attr("id", "text")
      .text("Honduras");

  svg.append("text")
     .attr("x", -220)
     .attr("y", -110)
     .attr("id", "text")
     .text("México");

 svg.append("text")
    .attr("x", -130)
    .attr("y", -200)
    .attr("id", "text")
    .text("Nicaragua");

  svg.append("text")
     .attr("x", -55)
     .attr("y", -220)
     .attr("id", "text")
     .text("Panamá");

  var chordGenerator = d3.chord()
      .padAngle(0.05)
      .sortSubgroups(d3.descending)

  var chords = chordGenerator(data);

  outerRadius = w * 0.5 - 35;
  innerRadius = outerRadius - 13;

  arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  var ribbonGenerator = d3.ribbon().radius(innerRadius-3);

  color = d3.scaleOrdinal()
      .domain(d3.range(8))
      .range(["#beddb2", "#5d6f66", "#b3b3b3", "#b4d1d2", "#9ca0c3", "#faf3dd", "#f5cbb7", "#08415c"]);

  d3.select("svg")
    .selectAll("path")
    .data(chords)
    .enter()
    .append("path")
    .attr("d", ribbonGenerator)
    .attr("fill", function(d,i) { return color(d.target.index); })
    .attr("fill-opacity", 2/3)
    .attr("stroke", function(d, i) { return d3.rgb(color(d.target.index)).darker(); })
    .attr("stroke-width", 0);

  var group = svg.append("g")
    .selectAll("g")
    .data(chords.groups)
    .enter()
    .append("g");

  group.append("path")
    .attr("fill", function(d,i) { return color(d.index); })
    .attr("fill-opacity", 3/4)
    .attr("stroke", "darkgray")
    .attr("stroke-width", 0.75)
    .attr("d", arc);
