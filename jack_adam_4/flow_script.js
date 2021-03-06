var w = 715;
var h = 715;

var xy = []
for (var i = 0; i <= 20; i++) {
  xy[i] = i / 2;
}

var vectors = []
vectors.length = 441;
for (var i = 0; i < 441; i++) {
  vectors[i] = [];
  vectors[i].length = 2;
}

var count = 0;
for (var x = 0; x <= 10; x+=.5) {
  for (var y = 0; y <= 10; y+=.5) {
    vectors[count][0] = ((y-5)+(5-x)/2);
    vectors[count][1] = (((5-y)/2)+(5-x));
    count++;
  }
}
console.log(vectors);

var svg = d3.select("body")
         .append("svg")
         .attr("width", w)
         .attr("height", h);

var ga = d3.select("svg").append("g").attr("id","a");
var gb = d3.select("svg").append("g").attr("id","b");

// vertical
for (var i=30; i<=h-60; i+=30) {
   svg.append("line")
        .attr("x1", i)
        .attr("y1", 30)
        .attr("x2", i)
        .attr("y2", h-85)
        .attr("class", "line")
};
svg.selectAll("gb")
    .data(xy)
    .enter()
    .append("text")
    .attr("id", "text")
    .attr("x", function(d,i) { return (i * 29.8 + 27); })
    .attr("y", h-35)
    .text(function(d,i) { return xy[i]; });

// horizontal
for (var j=30; j<=w-60; j+=30) {
   svg.append("line")
        .attr("x1", 30)
        .attr("y1", j)
        .attr("x2", w-85)
        .attr("y2", j)
        .attr("class", "line");
};
svg.selectAll("ga")
    .data(xy)
    .enter()
    .append("text")
    .attr("id", "text")
    .attr("x", w-45)
    .attr("y", function(d,i) { return (i * 29.8 + 35); })
    .text(function(d,i) { return xy[i]; });

 svg.selectAll("polygon")
    .data(vectors)
    .enter()
    .append("polygon")
    .attr("points", "0,10 5,10 5,13 10,9 5,5 5,8 0,8")
    .attr("fill", "#808080")
    .attr("stroke", "#595959")
    .attr("transform", function(d,i) {
      if (d[0] == 0 && d[1] == 0) rotation = 90;
        else { rotation = -180 + (180 * Math.atan(d[1]/d[0])/Math.PI); }
      if (d[0] < 0) rotation += 180;
    return "translate("+ (((Math.floor(i/21)*30)+30))+","+ (((i%21) * 30) + 30)+") rotate("+rotation+")scale("+ Math.hypot(d[0]/1.5,d[1]/1.5)+",1)"
  });
