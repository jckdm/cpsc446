var dataset;
var w = 500;
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
var cemp = 0;
var med = 0;
var memp = 0;
var phys = 0;
var pemp = 0;

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

        if (field == "Chemistry") { chem++;
          if (theory == 0) { cemp++; }
        }

        if (field == "Medicine") { med++;
          if (theory == 0) { memp++; }
        }

        if (field == "Physics") { phys++;
          if (theory == 0) { pemp++; }
        }

        sci[i][0] = name;
        sci[i][1] = field;
        sci[i][2] = birth;
        sci[i][3] = prize;
        sci[i][4] = mid;
        sci[i][5] = death;
        sci[i][6] = theory;
        sci[i][7] = agedeg;
      }

      var ctheory = chem - cemp;
      var mtheory = med - memp;
      var ptheory = phys - pemp;

      var ctheory_arr = [];
      ctheory_arr.length = ctheory;

      for (var i = 0; i < ctheory; i++) {
        ctheory_arr[i] = [];
        ctheory_arr[i].length = 3;
      }

      var cemp_arr = [];
      cemp_arr.length = cemp;

      for (var i = 0; i < cemp; i++) {
        cemp_arr[i] = [];
        cemp_arr[i].length = 3;
      }

      var mtheory_arr = [];
      mtheory_arr.length = mtheory;

      for (var i = 0; i < mtheory; i++) {
        mtheory_arr[i] = [];
        mtheory_arr[i].length = 3;
      }

      var memp_arr = [];
      memp_arr.length = memp;

      for (var i = 0; i < memp; i++) {
        memp_arr[i] = [];
        memp_arr[i].length = 3;
      }

      var ptheory_arr = [];
      ptheory_arr.length = ptheory;

      for (var i = 0; i < ptheory; i++) {
        ptheory_arr[i] = [];
        ptheory_arr[i].length = 3;
      }

      var pemp_arr = [];
      pemp_arr.length = pemp;

      for (var i = 0; i < pemp; i++) {
        pemp_arr[i] = [];
        pemp_arr[i].length = 3;
      }

      var c = 0;
      var k = 0;
      var m = 0;
      var n = 0;
      var t = 0;
      var y = 0;

      var cmin = 2000;
      var cmax = -1;
      var mmin = 2000;
      var mmax = -1;
      var pmin = 2000;
      var pmax = -1;

      for (var i = 0; i < 525; i++) {
        var name = Object.values(dataset[i])[0];
        var field = Object.values(dataset[i])[1];
        var birth = parseInt(Object.values(dataset[i])[2]);
        var prize = parseInt(Object.values(dataset[i])[3]);
        var theory = parseInt(Object.values(dataset[i])[6]);

        if (field == "Chemistry") {
          if (birth < cmin) { cmin = birth; }
          if (birth > cmax) { cmax = birth; }
          if (theory == 0) {
            cemp_arr[c][0] = name;
            cemp_arr[c][1] = field;
            cemp_arr[c][2] = prize;
            cemp_arr[c][3] = theory;
            c++;
          }
          else {
            ctheory_arr[k][0] = name;
            ctheory_arr[k][1] = field;
            ctheory_arr[k][2] = prize;
            ctheory_arr[k][3] = theory;
            k++;
          }
        }
        if (field == "Medicine") {
          if (birth < mmin) { mmin = birth; }
          if (birth > mmax) { mmax = birth; }
          if (theory == 0) {
            memp_arr[m][0] = name;
            memp_arr[m][1] = field;
            memp_arr[m][2] = prize;
            memp_arr[m][3] = theory;
            m++;
          }
          else {
            mtheory_arr[n][0] = name;
            mtheory_arr[n][1] = field;
            mtheory_arr[n][2] = prize;
            mtheory_arr[n][3] = theory;
            n++;
          }
        }
        if (field == "Physics") {
          if (birth < pmin) { pmin = birth; }
          if (birth > pmax) { pmax = birth; }
          if (theory == 0) {
            pemp_arr[t][0] = name;
            pemp_arr[t][1] = field;
            pemp_arr[t][2] = prize;
            pemp_arr[t][3] = theory;
            t++;
          }
          else {
            ptheory_arr[y][0] = name;
            ptheory_arr[y][1] = field;
            ptheory_arr[y][2] = prize;
            ptheory_arr[y][3] = theory;
            y++;
          }
        }
      }

var years = [[cmin, cmax], [mmin, mmax], [pmin, pmax]];

var chemistry = [[ctheory_arr],[cemp_arr], ctheory, cemp];
var medicine = [[mtheory_arr],[memp_arr], mtheory, memp];
var physics = [[ptheory_arr],[pemp_arr], ptheory, pemp];

var theories = [ctheory, mtheory, ptheory];
var emps = [cemp, memp, pemp];

var max = -1;
var divs = [];
divs.length = 3;
var sums = [];
sums.length = 3;

for (var i = 0; i < 3; i++) {
  sums[i] = theories[i] + emps[i];
  if (sums[i] > max) { max = sums[i]; }
}

for (var i = 0; i < 3; i++) {
  divs[i] = max / sums[i];
}

var st = [];
st.length = 3;

var se = [];
se.length = 3;

for (var i = 0; i < 3; i++) {
  st[i] = divs[i] * theories[i];
  se[i] = divs[i] * emps[i];
}

var scaled = [];
scaled.length = 3;

for (var i = 0; i < 3; i++) {
  scaled[i] = [];
  scaled[i].length = 2;
  scaled[i][0] = st[i];
  scaled[i][1] = se[i];
}

var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      var ga = d3.select("svg").append("g").attr("id","a");
      var gb = d3.select("svg").append("g").attr("id","b");

      ga.selectAll("rect")
            .data(theories)
            .enter()
            .append("rect")
            .attr("x", function(d, i) { return i * (w / 3) + 50; })
            .attr("y", function(d) {
              return (h - padding) - (d * 2.3);
            })
            .attr("fill", "#52527a")
            .attr("width", 15)
            .attr("height", function(d) {
               return d * 2.3;
            })
            .append("title")
            .text(function(d, i) {
               return "Awards range from " + years[i][0] + " to " + years[i][1] + ".";
            });

      gb.selectAll("rect")
            .data(emps)
            .enter()
            .append("rect")
            .attr("x", function(d, i) { return i * (w / 3) + 70; })
            .attr("y", function(d) {
              return (h - padding) - (d * 2.3);
            })
            .attr("fill", "#8e8e90")
            .attr("width", 15)
            .attr("height", function(d) {
               return d * 2.3;
            })
            .append("title")
            .text(function(d, i) {
               return "Awards range from " + years[i][0] + " to " + years[i][1] + ".";
            });

      var xScale = d3.scaleBand()
        .domain(d3.range(0))
        .range([padding, w - 25])
        .paddingInner(0.05);

      var yScale = d3.scaleLinear()
         .domain([0, (d3.max(emps, function(d) { return d; }) + 10)])
         .range([h - padding, padding]);

       var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(0);

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
            .attr("y", 480)
            .attr("x", 68)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Chemistry");

        svg.append("text")
            .attr("y", 480)
            .attr("x", 234)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Medicine");

        svg.append("text")
            .attr("y", 480)
            .attr("x", 402)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Physics");

    d3.select("#c1")
      .on("click", function() {

        yScale.domain([0, 1]);
         var per = d3.format(".0%");
         yAxis.tickFormat(per);

        ga.selectAll("rect")
             .data(st)
             .transition()
             .duration(2500)
             .attr("x", function(d, i) { return i * (w / 3) + 50; })
             .attr("y", function(d) { return (h - padding) - (d * 2.26); })
             .attr("fill", "#52527a")
             .attr("width", 36)
             .attr("height", function(d) {
                return d * 2.26;
             });

        gb.selectAll("rect")
             .data(scaled)
             .transition()
             .duration(2500)
             .attr("x", function(d, i) { return i * (w / 3) + 50; })
             .attr("y", function(d) { return (h - padding) - (d[0] * 2.26) - (d[1] * 2.26); })
             .attr("fill", "#8e8e90")
             .attr("width", 36)
             .attr("height", function(d) {
                return d[1] * 2.26;
             });

          svg.select(".y.axis")
              .transition()
              .duration(2500)
            .call(yAxis);

        document.getElementById('c1').style.color = "white";
       });
    }
