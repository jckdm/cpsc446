var dataset;
var w = 1100;
var h = 550;

d3.csv("Jones_Weinberg_2011_PNAS_copy.csv", function(data) {
    dataset = data;
    make();
});

var padding = 35;

var sci = [];
sci.length = 564;

for (var i = 0; i < 564; i++) {
  sci[i] = [];
  sci[i].length = 8;
}

var women = 0;

function make() {
    for (var i = 0; i < 564; i++) {
        var name = Object.values(dataset[i])[0];
        var field = Object.values(dataset[i])[1];
        var birth = parseInt(Object.values(dataset[i])[2]);
        var prize = parseInt(Object.values(dataset[i])[3]);
        var mid = parseInt(Object.values(dataset[i])[4]);
        var death = parseInt(Object.values(dataset[i])[5]);
        var theory = parseInt(Object.values(dataset[i])[6]);
        var agedeg = parseInt(Object.values(dataset[i])[7]);
        var gender = parseInt(Object.values(dataset[i])[8]);

        if (gender == 0) { women++; }

        sci[i][0] = name;
        sci[i][1] = field;
        sci[i][2] = birth;
        sci[i][3] = prize;
        sci[i][4] = mid;
        sci[i][5] = death;
        sci[i][6] = theory;
        sci[i][7] = agedeg;
        sci[i][8] = gender;
      }

      var men = 564 - women;

      var men_arr = [];
      men_arr.length = men;

      var m_names = [];
      m_names.length = men;

      for (var i = 0; i < men; i++) {
        m_names[i] = [];
        m_names[i].length = 1;
      }

      var women_arr = [];
      women_arr.length = women;

      var w_names = [];
      w_names.length = women;


      for (var i = 0; i < women; i++) {
        w_names[i] = [];
        w_names[i].length = 2;
      }

      for (var i = 0; i < men; i++) {
        men_arr[i] = [];
        men_arr[i].length = 2;
      }

      for (var i = 0; i < women; i++) {
        women_arr[i] = [];
        women_arr[i].length = 2;
      }

      var wc = 0;
      var m = 0;

      for (var i = 0; i < 564; i++) {
        var name = sci[i][0];
        var field = sci[i][1];
        var birth = sci[i][2];
        var prize = sci[i][3];
        var gender = sci[i][8];
        var awage = prize - birth;

          if (gender == 0) {
            women_arr[wc][0] = awage;
            women_arr[wc][1] = prize
            w_names[wc][0] = name;
            w_names[wc][1] = field;
            wc++;
          }
          else {
            men_arr[m][0] = awage;
            men_arr[m][1] = prize;
            m_names[m][0] = name;
            m_names[m][1] = field;
            m++;
          }
      }

var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      var ga = d3.select("svg").append("g").attr("id","a");
      var gb = d3.select("svg").append("g").attr("id","b");

      var xScale = d3.scaleLinear()
        .domain([15, 91])
        .range([padding, w - 15])

      var yScale = d3.scaleLinear()
         .domain([1890, 2020])
         .range([h - padding, padding]);

      ga.selectAll("circle")
            .data(men_arr)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d[0]); })
            .attr("cy", function(d) { return yScale(d[1]); })
            .attr("fill", "#6ca2d8")
            .attr("r", 5)
            .append("title")
            .text(function(d, i) {
               return m_names[i][0] + ": " + m_names[i][1];
            });

      gb.selectAll("circle")
            .data(women_arr)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d[0]); })
            .attr("cy", function(d) { return yScale(d[1]); })
            .attr("fill", "#ff7fbf")
            .attr("r", 5)
            .append("title")
            .text(function(d, i) {
               return w_names[i][0] + ": " + w_names[i][1];
            });

        var xAxis = d3.axisBottom()
             .scale(xScale)
             .ticks(15);

          var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(15)
                .tickFormat(d3.format("d"));

           svg.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(10," + (h - padding) + ")")
             .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .attr("transform", "translate(" + (padding + 10) + ",0)")
              .call(yAxis);

        svg.append("text")
            .attr("y", 548)
            .attr("x", 570)
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Age");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -3)
            .attr("x", -225)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Year of Prize");
    }
