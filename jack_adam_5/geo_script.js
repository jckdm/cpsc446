var w = 950;
var h = 600;

var projection = d3.geoAlbersUsa()
       .translate([w/2, h/2])
       .scale([1300]);

var path = d3.geoPath()
      .projection(projection);

var color = d3.scaleQuantize()
      .range(["#f7fbff","#deebf7","#c6dbef","#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"]);

var formatAsThousands = d3.format(",");

var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform) }))
    .append("g")

d3.csv("tobacco_housing.csv", function(data) {
  color.domain([
    d3.min(data, function(d) { return parseInt(d.Housing); }),
    d3.max(data, function(d) { return parseInt(d.Housing); })
  ]);

  var units = [];
  units.length = data.length;
  for (var i = 0; i <= 50; i++) { units[i] = parseInt(data[i].Housing); }

  console.log(units);

  d3.json("us-states.json", function(json) {
    for (var i = 0; i < data.length; i++) {
      var dataState = data[i].State;
      var dataValue = parseInt(data[i].Housing);

      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {
          json.features[j].properties.value = dataValue;
          break;
        }
      }
    }
    svg.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .style("stroke", "darkgray")
       .style("fill", function(d) {
          //Get data value
          var value = d.properties.value;
          if (value) { return color(value); }
          else { return "#ccc"; } })
       .append("title")
       .text(function(d, i) { return d.properties.name + ": " + formatAsThousands(units[i]) + " units"; });

    d3.csv("statecentroids.csv", function(data) {
      svg.selectAll("circle")
         .data(data)
         .enter()
         .append("circle")
         .attr("cx", function(d) { return projection([d.Long, d.Lat])[0]; })
         .attr("cy", function(d) { return projection([d.Long, d.Lat])[1]; })
         .attr("r", function(d) { return ((Math.sqrt(d.Tobacco) / Math.PI) / 20); })
         .style("fill", "red")
         .style("stroke", "black")
         .style("stroke-width", 1)
         .style("opacity", 0.6)
         .append("title")
         .text(function(d) { var per = (d.Tobacco / d.Housing); return d.Name + ": $" + formatAsThousands(d.Tobacco) + " in taxes"; });
    });
  });
});
