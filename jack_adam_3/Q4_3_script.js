var dataset;
var w = 500;
var h = 550;

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

      var med_arr = [];
      med_arr.length = med;

      var phys_arr = [];
      phys_arr.length = phys;

      var c = 0;
      var m = 0;
      var p = 0;

      for (var i = 0; i < 525; i++) {
        var field = sci[i][1];
        var prize = sci[i][3];
        var mid = sci[i][4];
        var avg = prize - mid;

          if (field == "Chemistry") {
            chem_arr[c] = avg;
            c++;
          }
          if (field == "Medicine") {
            med_arr[m] = avg;
            m++;
          }
          if (field == "Physics") {
            phys_arr[p] = avg;
            p++;
          }
      }

      var chem_avg = 0;
      var chem_min = 100;
      var chem_max = -100;
      for (var i = 0; i < chem; i++) {
        chem_avg += chem_arr[i];
        if (chem_arr[i] < chem_min) { chem_min = chem_arr[i]; }
        if (chem_arr[i] > chem_max) { chem_max = chem_arr[i]; }
      }
      chem_avg /= chem;

      var med_avg = 0;
      var med_min = 100;
      var med_max = -100;
      for (var i = 0; i < med; i++) {
        med_avg += med_arr[i];
        if (med_arr[i] < med_min) { med_min = med_arr[i]; }
        if (med_arr[i] > med_max) { med_max = med_arr[i]; }
      }
      med_avg /= med;

      var phys_avg = 0;
      var phys_min = 100;
      var phys_max = -100;
      for (var i = 0; i < phys; i++) {
        phys_avg += phys_arr[i];
        if (phys_arr[i] < phys_min) { phys_min = phys_arr[i]; }
        if (phys_arr[i] > phys_max) { phys_max = phys_arr[i]; }
      }
      phys_avg /= phys;

      var cc = [chem_min, chem_avg, chem_max];
      var mm = [med_min, med_avg, med_max];
      var pp = [phys_min, phys_avg, phys_max];

      var avgs = [chem_avg, med_avg, phys_avg];
      var mins = [chem_min, med_min, phys_min];
      var maxs = [chem_max, med_max, phys_max];

      console.log(cc, mm, pp);

var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      var ga = d3.select("svg").append("g").attr("id","a");
      var gb = d3.select("svg").append("g").attr("id","b");
      var gc = d3.select("svg").append("g").attr("id","c");

      var xScale = d3.scaleLinear()
        .domain([0])
        .range([padding, w - 120])

      var yScale = d3.scaleLinear()
         .domain([-10, d3.max(mins)])
         .range([h - padding, padding]);

      ga.selectAll("rect")
            .data(mins)
            .enter()
            .append("rect")
            .attr("x", function(d, i) { return i * (w / 4) + 65; })
            .attr("y", function(d) {
                if (d < 0) { return (h - padding - 600) - (d * 40) }
                else { return (h - padding - 400) - (d * 40); }
            })
            .attr("fill", function(d, i) {
              if (i % 3 == 0) { return "#52527a"; }
              if (i % 3 == 1) { return "#8e8e90"; }
              if (i % 3 == 2) { return "#bd8c7d"; }
            })
            .attr("width", 25)
            .attr("height", function(d) { return Math.abs(d * 40);
            });

     var xAxis = d3.axisBottom()
          .scale(xScale);

      var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(15);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (h - padding - 400) + ")")
          .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -3)
          .attr("x", -225)
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("font-size", "11px")
          .text("Number of years");

        svg.append("text")
            .attr("y", 535)
            .attr("x", 78)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Chemistry");

        svg.append("text")
            .attr("y", 535)
            .attr("x", 203)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Medicine");

        svg.append("text")
            .attr("y", 535)
            .attr("x", 328)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Physics");

        d3.select("#c1")
          .on("click", function() {

          ga.selectAll("rect")
                .data(avgs)
                .transition()
                .duration(2500)
                .attr("y", function(d) { return (h - padding) - (d * 26.35); })
                .attr("fill", function(d, i) {
                  if (i % 3 == 0) { return "#52527a"; }
                  if (i % 3 == 1) { return "#8e8e90"; }
                  if (i % 3 == 2) { return "#bd8c7d"; }
                })
                .attr("width", 25)
                .attr("height", function(d) { return d * 26.35; });

            yScale.domain([0, d3.max(avgs) + 1]);

            svg.select(".x.axis")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .transition()
                .duration(2500)
              .call(xAxis);

            svg.select(".y.axis")
                .transition()
                .duration(2500)
              .call(yAxis);

              document.getElementById('c1').style.display = "none";
              document.getElementById('c2').style.display = "block";
              document.getElementById('title').innerHTML = 'Average Years Nobel Prize Awarded After Mid-research Point';

          })

      d3.select("#c2")
        .on("click", function() {

        ga.selectAll("rect")
              .data(maxs)
              .transition()
              .duration(2500)
              .attr("y", function(d) { return (h - padding) - (d * 8); })
              .attr("fill", function(d, i) {
                if (i % 3 == 0) { return "#52527a"; }
                if (i % 3 == 1) { return "#8e8e90"; }
                if (i % 3 == 2) { return "#bd8c7d"; }
              })
              .attr("width", 25)
              .attr("height", function(d) { return d * 8; });

          yScale.domain([0, d3.max(maxs) + 2]);

          svg.select(".y.axis")
              .transition()
              .duration(2500)
            .call(yAxis);

            document.getElementById('c2').style.color = "white";
            document.getElementById('title').innerHTML = 'Maximum Years Nobel Prize Awarded After Mid-research Point';
        })
    }
