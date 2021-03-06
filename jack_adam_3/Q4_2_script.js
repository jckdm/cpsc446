var dataset;
var w = 1000;
var h = 500;

d3.csv("Jones_Weinberg_2011_PNAS.csv", function(data) {
    dataset = data;
    make();
});

var padding = 35;

var sci = [];
sci.length = 525;

for (var i = 0; i < 525; i++) {
  sci[i] = [];
  sci[i].length = 8;
}

var chem = 0;
var med = 0;
var phys = 0;

function make() {
    for (var i = 0; i < 525; i++) {
        var name = Object.values(dataset[i])[0];
        var field = Object.values(dataset[i])[1];
        var birth = parseInt(Object.values(dataset[i])[2]);
        var prize = parseInt(Object.values(dataset[i])[3]);
        var mid = parseInt(Object.values(dataset[i])[4]);
        var death = parseInt(Object.values(dataset[i])[5]);
        var theory = parseInt(Object.values(dataset[i])[6]);
        var agedeg = parseInt(Object.values(dataset[i])[7]);

        if (field == "Chemistry") { chem++; }
        if (field == "Medicine") { med++; }
        if (field == "Physics") { phys++; }

        sci[i][0] = name;
        sci[i][1] = field;
        sci[i][2] = birth;
        sci[i][3] = prize;
        sci[i][4] = mid;
        sci[i][5] = death;
        sci[i][6] = theory;
        sci[i][7] = agedeg;
      }

      var chem_arr = [];
      chem_arr.length = chem;

      var chem_names = [];
      chem_names.length = chem;

      for (var i = 0; i < chem; i++) {
        chem_arr[i] = [];
        chem_arr[i].length = 2;
      }

      var med_arr = [];
      med_arr.length = med;

      var med_names = [];
      med_names.length = med;

      for (var i = 0; i < med; i++) {
        med_arr[i] = [];
        med_arr[i].length = 2;
      }

      var phys_arr = [];
      phys_arr.length = phys;

      var phys_names = [];
      phys_names.length = phys;

      for (var i = 0; i < phys; i++) {
        phys_arr[i] = [];
        phys_arr[i].length = 2;
      }

      var c = 0;
      var m = 0;
      var p = 0;

      for (var i = 0; i < 525; i++) {
        var name = sci[i][0];
        var field = sci[i][1];
        var birth = sci[i][2];
        var prize = sci[i][3];
        var agedeg = sci[i][7];
        var ageprize = prize - birth;

          if (field == "Chemistry") {
            chem_arr[c][0] = ageprize;
            chem_arr[c][1] = agedeg;
            chem_names[c] = name;
            c++;
          }
          if (field == "Medicine") {
            med_arr[m][0] = ageprize;
            med_arr[m][1] = agedeg;
            med_names[m] = name;
            m++;
          }
          if (field == "Physics") {
            phys_arr[p][0] = ageprize;
            phys_arr[p][1] = agedeg;
            phys_names[p] = name;
            p++;
          }
      }

var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      var ga = d3.select("svg").append("g").attr("id","a");
      var gb = d3.select("svg").append("g").attr("id","b");
      var gc = d3.select("svg").append("g").attr("id","c");

      var xScale = d3.scaleLinear()
        .domain([20, 90])
        .range([padding, w - 5])

      var yScale = d3.scaleLinear()
         .domain([10, 45])
         .range([h - padding, padding]);

      ga.selectAll("circle")
            .data(chem_arr)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d[0]); })
            .attr("cy", function(d) { return yScale(d[1]); })
            .attr("fill", "#52527a")
            .attr("r", 5)
            .append("title")
            .text(function(d, i) {
               return chem_names[i];
            });

      gb.selectAll("circle")
            .data(med_arr)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d[0]); })
            .attr("cy", function(d) { return yScale(d[1]); })
            .attr("fill", "#8e8e90")
            .attr("r", 5)
            .append("title")
            .text(function(d, i) {
               return med_names[i];
            });

      gc.selectAll("circle")
            .data(phys_arr)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d[0]); })
            .attr("cy", function(d) { return yScale(d[1]); })
            .attr("fill", "#bd8c7d")
            .attr("r", 5)
            .append("title")
            .text(function(d, i) {
               return phys_names[i];
            });

     var xAxis = d3.axisBottom()
          .scale(xScale)
          .ticks(10);

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

        svg.append("text")
            .attr("y", 495)
            .attr("x", 535)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Age @ Award");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -3)
            .attr("x", -225)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Age @ Highest Degree");
    }
