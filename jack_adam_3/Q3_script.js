var dataset;
var w = 1100;
var h = 500;

d3.csv("barinput.csv", function(data) {
    dataset = data;
    make();
});

var arr_a = [];
arr_a.length = 15;

var arr_b = [];
arr_b.length = 15;

var arr_c = [];
arr_c.length = 15;

var arr_b2 = [];
arr_b2.length = 15;

var arr_c2 = [];
arr_c2.length = 15;

var max = -1;

var arr_a1 = [];
arr_a1.length = 15;

var arr_b1 = [];
var arr_c1 = [];

for (var i = 0; i < 15; i++) {
  arr_b2[i] = [];
  arr_b2[i].length = 1;
  arr_c2[i] = [];
  arr_c2[i].length = 1;
  arr_b1[i] = [];
  arr_b1[i].length = 1;
  arr_c1[i] = [];
  arr_c1[i].length = 1;
}

var sums = [];
sums.length = 15;

var divs = [];
divs.length = 15;

var padding = 35;

function make() {
    for (var i = 0; i < 15; i++) {
        var a = parseInt(Object.values(dataset[i])[1]);
        var b = parseInt(Object.values(dataset[i])[2]);
        var c = parseInt(Object.values(dataset[i])[3]);

        arr_a[i] = a
        arr_b[i] = b
        arr_c[i] = c

        arr_b2[i][0] = b
        arr_b2[i][1] = a

        arr_c2[i][0] = c
        arr_c2[i][1] = a + b;

        sums[i] = a + b + c;
        if (sums[i] > max) { max = sums[i]; }
      }

    for (var i = 0; i < 15; i++) {
      divs[i] = max / sums[i];
    }

    for (var i = 0; i < 15; i++) {
      arr_a1[i] = arr_a[i] * divs[i];
      arr_b1[i][0] = arr_b2[i][0] * divs[i];
      arr_b1[i][1] = arr_a1[i];
      arr_c1[i][0] = arr_c2[i][0] * divs[i];
      arr_c1[i][1] = arr_a1[i] + arr_b1[i][0];
    }

var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      var ga = d3.select("svg").append("g").attr("id","a");
      var gb = d3.select("svg").append("g").attr("id","b");
      var gc = d3.select("svg").append("g").attr("id","c");

    ga.selectAll("rect")
          .data(arr_a)
          .enter()
          .append("rect")
          .attr("x", function(d, i) { return i/1.015 * (w / arr_a.length) + 40; })
          .attr("y", function(d) {
            return (h - padding) - (d * 48);
          })
          .attr("fill", "#8e8e90")
          .attr("width", 12)
          .attr("height", function(d) {
             return d * 48;
          });

    gb.selectAll("rect")
          .data(arr_b)
          .enter()
          .append("rect")
          .attr("x", function(d, i) { return i/1.015 * (w / arr_b.length) + 55; })
          .attr("y", function(d) {
            return (h - padding) - (d * 48);
          })
          .attr("fill", "#bd8c7d")
          .attr("width", 12)
          .attr("height", function(d) {
             return d * 48;
          });

    gc.selectAll("rect")
          .data(arr_c)
          .enter()
          .append("rect")
          .attr("x", function(d, i) { return i/1.015 * (w / arr_c.length) + 70; })
          .attr("y", function(d) {
            return (h - padding) - (d * 48);
          })
          .attr("fill", "#52527a")
          .attr("width", 12)
          .attr("height", function(d) {
             return d * 48;
          });

    var xScale = d3.scaleBand()
      .domain(d3.range(15))
      .range([padding, w + 5])
      .paddingInner(0.05);

    var yScale = d3.scaleLinear()
       .domain([0, 9])
       .range([h - padding, padding]);

     var xAxis = d3.axisBottom()
          .scale(xScale)
          .ticks(15)
        .tickFormat(function(d, i) { return i + 1; });

      var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(10);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);

    d3.select("#c1")
      .on("click", function() {

        yScale.domain([0, 20]);

        ga.selectAll("rect")
             .data(arr_a)
             .transition()
             .duration(2500)
             .attr("x", function(d, i) { return i/1.015 * (w / 15) + 45; })
             .attr("y", function(d) { return (h - padding) - (d * 21.5); })
             .attr("fill", "#8e8e90")
             .attr("width", 36)
             .attr("height", function(d) {
                return d * 21.5;
             });
        gb.selectAll("rect")
             .data(arr_b2)
             .transition()
             .duration(2500)
             .attr("x", function(d, i) { return i/1.015 * (w / 15) + 45; })
             .attr("y", function(d) { return (h - padding) - (d[0] * 21.5) - (d[1] * 21.5); })
             .attr("fill", "#bd8c7d")
             .attr("width", 36)
             .attr("height", function(d) {
                return d[0] * 21.5;
             });
         gc.selectAll("rect")
              .data(arr_c2)
              .transition()
              .duration(2500)
              .attr("x", function(d, i) { return i/1.015 * (w / 15) + 45; })
              .attr("y", function(d) { return (h - padding) - (d[0] * 21.5) - (d[1] * 21.5); })
              .attr("fill", "#52527a")
              .attr("width", 36)
              .attr("height", function(d) {
                 return d[0] * 21.5;
              });

          svg.select(".y.axis")
              .transition()
              .duration(2500)
            .call(yAxis);

            document.getElementById('c1').style.display = "none";
            document.getElementById('c2').style.display = "block";
            document.getElementById('title').innerHTML = 'Stacked Column';
       });

       d3.select("#c2")
         .on("click", function() {

           ga.selectAll("rect")
                .data(arr_a1)
                .transition()
                .duration(2500)
                .attr("x", function(d, i) { return i/1.015 * (w / 15) + 45; })
                .attr("y", function(d) { return (h - padding) - (d * 22.65); })
                .attr("fill", "#8e8e90")
                .attr("width", 36)
                .attr("height", function(d) {
                   return d * 22.65;
                });
           gb.selectAll("rect")
                .data(arr_b1)
                .transition()
                .duration(2500)
                .attr("x", function(d, i) { return i/1.015 * (w / 15) + 45; })
                .attr("y", function(d) { return (h - padding) - (d[0] * 22.65) - (d[1] * 22.65); })
                .attr("fill", "#bd8c7d")
                .attr("width", 36)
                .attr("height", function(d) {
                   return d[0] * 22.65;
                });
            gc.selectAll("rect")
                 .data(arr_c1)
                 .transition()
                 .duration(2500)
                 .attr("x", function(d, i) { return i/1.015 * (w / 15) + 45; })
                 .attr("y", function(d) { return (h - padding) - (d[0] * 22.65) - (d[1] * 22.65); })
                 .attr("fill", "#52527a")
                 .attr("width", 36)
                 .attr("height", function(d) {
                    return d[0] * 22.65;
                 });

              yScale.domain([0, 1]);
               var per = d3.format(".0%");
               yAxis.tickFormat(per);

               svg.select(".y.axis")
                   .transition()
                   .duration(2500)
                 .call(yAxis);

               document.getElementById('c2').style.color = "white";
               document.getElementById('title').innerHTML = '100% Stacked Column';
          });

    }
