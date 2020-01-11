var dataset;
var w = 450;
var h = 500;

d3.csv("SCOTUS.csv", function(data) {
    dataset = data;
    make();
});

function named(name) {
  if (name == "Breyer") { return 26; }
  if (name == "Ginsburg") { return 27; }
  if (name == "Souter") { return 28; }
  if (name == "Stevens") { return 29; }
  if (name == "OConnor") { return 30; }
  if (name == "Kennedy") { return 31; }
  if (name == "Rehnquist") { return 32; }
  if (name == "Thomas") { return 33; }
  if (name == "Scalia") { return 34; }
}

function make() {
    scotus = [];
    scotus.length = 35;

    for (var i = 0; i < 35; i++) {
      scotus[i] = [];
      scotus[i].length = 12;
    }

    for (var i = 0; i < 35; i++) {
      scotus[i][0] = parseInt(Object.values(dataset[i])[0]);
      scotus[i][1] = Object.values(dataset[i])[1];
      scotus[i][2] = parseInt(Object.values(dataset[i])[2]);
      // justices below
      scotus[i][3] = parseInt(Object.values(dataset[i])[3]);
      scotus[i][4] = parseInt(Object.values(dataset[i])[4]);
      scotus[i][5] = parseInt(Object.values(dataset[i])[5]);
      scotus[i][6] = parseInt(Object.values(dataset[i])[6]);
      scotus[i][7] = parseInt(Object.values(dataset[i])[7]);
      scotus[i][8] = parseInt(Object.values(dataset[i])[8]);
      scotus[i][9] = parseInt(Object.values(dataset[i])[9]);
      scotus[i][10] = parseInt(Object.values(dataset[i])[10]);
      scotus[i][11] = parseInt(Object.values(dataset[i])[11]);
    }

    var justices = ["Breyer", "Ginsburg", "Souter", "Stevens", "OConnor", "Kennedy", "Rehnquist", "Thomas", "Scalia"];

    var nodes = [];
    for (var i = 0; i < 35; i++)
        nodes.push({name: scotus[i][1]});

    var edges = [];
    for (var i = 0; i < 35; i++) {
      for (var j = 3; j < 12; j++) {
        if (scotus[i][j] == 1) {
          edges.push({source: i, target: named(justices[j - 3])});
        }
      }
    }

    var c = {nodes, edges};
    console.log(c);

    // ALL OF THE LINES BELOW ADAPTED FROM MURRAY 13_08

    var force = d3.forceSimulation(c.nodes)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(c.edges))
            .force("center", d3.forceCenter().x(w/2).y(h/2));

    //Create SVG element
    var svg = d3.select("body")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

    //Create edges as lines
    var edgez = svg.selectAll("line")
      .data(c.edges)
      .enter()
      .append("line")
      .style("stroke", "#CCCCCC")
      .style("stroke-width", 1);

    //Create nodes as circles
    var nodez = svg.selectAll("circle")
      .data(c.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .style("stroke", "black")
      .style("stroke-width", 0.75)
      .style("fill", function(d, i) {
        if (i < 26) { return "#4B7447"; }
        else { return "#ACD0C0"; }
      })

    .call(d3.drag()  //Define what to do on drag events
      .on("start", dragStarted)
      .on("drag", dragging)
      .on("end", dragEnded));

      //Add a simple tooltip
      nodez.append("title")
         .text(function(d) {
          return d.name;
         });

      //Every time the simulation "ticks", this will be called
     force.on("tick", function() {

       edgez.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
       nodez.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });

     });

    //Define drag event functions
    function dragStarted(d) {
      if (!d3.event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragging(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d) {
      if (!d3.event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
}
