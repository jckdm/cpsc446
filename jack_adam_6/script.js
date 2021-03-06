
    // https://www.w3schools.com/howto/howto_css_modals.asp
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() { modal.style.display = "block"; }
    span.onclick = function() { modal.style.display = "none"; }

    var c = 0;

    function make(a) {
        if (c == 1) { make1(a); }
        if (c == 2) { make2(a); }
        if (c == 3) { make3(a); }
        if (c == 4) { make4(a); }
        if (c == 5) { make5(a); }
        if (c == 6) { make6(a); }
        if (c == 7) { make7(a); }
        if (c == 8) { make8(a); }
        if (c == 9) { make9(a); }
    }

    async function ani() {
      var count = 2011;
      var s = document.getElementById("slider");
      var a = document.getElementById("animate");
      s.value = count;
      a.style.display = "none";
      make();
      while (count < 2018) {
        make();
        await sleep(1500);
        count++;
        s.value = count;
      }
      a.style.display = "block";
    }

    var formatAsThousands = d3.format(",");

		var w = 850;
		var h = 600;
    var radius = Math.min(w, h) / 2;
    var padding = 20;
    var margin = 40;

    var svg = d3.select("#view").append("svg")
        .attr("width", w)
        .attr("height", h);

    var xScale = d3.scaleBand()
            .domain(d3.range(15))
            .rangeRound([padding, w - padding])
            .paddingInner(0.05);

    d3.csv("diagnose.csv", function(diData) {
      d3.csv("alive.csv", function(aData) {
        d3.csv("dead.csv", function(deData) {
          data1 = diData.filter(function(d) { return d.Category == "Age at Diagnosis"; });
          data2 = aData.filter(function(d) { return d.Category == "Age at Year End"; });
          data3 = deData.filter(function(d) { return d.Category == "Age at Death"; });
          data4 = diData.filter(function(d) { return d.Category == "Race/Ethnicity"; });
          data5 = aData.filter(function(d) { return d.Category == "Race/Ethnicity"; });
          data6 = deData.filter(function(d) { return d.Category == "Race/Ethnicity"; });
          data7 = diData.filter(function(d) { return d.Category.substring(0, 2) == "Tr"; });
          data8 = aData.filter(function(d) { return d.Category.substring(0, 2) == "Tr"; });
          data9 = deData.filter(function(d) { return d.Category.substring(0, 2) == "Tr"; });
        })
      })
    })

    function make1(arg) {

      if (arg == true) { document.getElementById('animate').style.display = "block"; }
      document.getElementById('output').style.display = "block";

      c = 1;
      var threshold = document.getElementById("slider").value;
      document.getElementById('output').innerHTML = threshold;
      var tit = document.getElementById('title');
      tit.innerHTML = "Age at HIV Diagnosis";
      tit.style.display = "block";
      document.getElementById('slide').style.display = "block";
      svg.selectAll("g").remove();

     var yScale = d3.scaleLinear()
       .domain([0,
         (d3.max(data1, function(d) { return parseInt(d.Count) + 13; }))])
       .range([h - padding, padding]);

     var yAxis = d3.axisLeft()
           .scale(yScale)
           .ticks(15);

     svg.selectAll('text').remove();

     svg.selectAll("text")
        .data(data1.filter(function(d) { return parseInt(d.Year) == threshold; }))
        .enter()
        .append("text")
        .text(function(d) { return d.Group; })
        .attr("class", "text")
        .attr("x", function(d,i) { return i * (w / 17.5) + padding*4.5; })
        .attr("y", function(d) { return yScale(d.Count) + 10; });

     svg.append("g")
         .attr("transform", "translate(" + (padding+30) + ",16)")
         .call(yAxis);

      svg.selectAll("rect").remove();

      svg.selectAll("rect")
            .data(data1.filter(function(d) { return parseInt(d.Year) == threshold; }))
            .enter()
            .append("rect")
            .attr("x", function(d,i) { return i * (w / 17.5) + padding*4.5; })
            .attr("y", function(d) { return yScale(d.Count) + padding; })
            .attr("class", "hot")
            .attr("width", 30)
            .attr("height", function(d) { return h - padding - yScale(d.Count); })
            .on("mouseover", function(d) {

              var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
              " people between the ages of " + d.Group + " were diagnosed with HIV."
              var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
              var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
              tool(xPos, yPos, text); })

   			   .on("mouseout", function() { d3.select("#tooltip").classed("hidden", true); });
        };

    function make2(arg) {

      if (arg == true) { document.getElementById('animate').style.display = "block"; }
      document.getElementById('output').style.display = "block";

      c = 2;
      var threshold = document.getElementById("slider").value;
      document.getElementById('output').innerHTML = threshold;
      var tit = document.getElementById('title');
      tit.innerHTML = "Age of Persons Living with HIV";
      tit.style.display = "block";
      document.getElementById('slide').style.display = "block";
      svg.selectAll("g").remove();

     var yScale = d3.scaleLinear()
       .domain([0,
         (d3.max(data2, function(d) { return parseInt(d.Count) + 135; }))])
       .range([h - padding, padding]);

     var yAxis = d3.axisLeft()
           .scale(yScale)
           .ticks(20);

     svg.selectAll('text').remove();

     svg.selectAll("text")
        .data(data2.filter(function(d) { return parseInt(d.Year) == threshold; }))
        .enter()
        .append("text")
        .text(function(d) { return d.Group; })
        .attr("class", "text")
        .attr("x", function(d,i) { return i * (w / 17.5) + padding*4.5; })
        .attr("y", function(d) { return yScale(d.Count) + 10; });

     svg.append("g")
         .attr("transform", "translate(" + (padding+30) + ",16)")
         .call(yAxis);

      svg.selectAll("rect").remove();

      svg.selectAll("rect")
            .data(data2.filter(function(d) { return parseInt(d.Year) == threshold; }))
            .enter()
            .append("rect")
            .attr("x", function(d,i) { return i * (w / 17.5) + padding*4.5; })
            .attr("y", function(d) { return yScale(d.Count) + padding; })
            .attr("class", "hot")
            .attr("width", 30)
            .attr("height", function(d) { return h - padding - yScale(d.Count); })
            .on("mouseover", function(d) {

              var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
              " people between the ages of " + d.Group + " were living with HIV."
              var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
              var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
              tool(xPos, yPos, text); })

   			   .on("mouseout", function() { d3.select("#tooltip").classed("hidden", true); });
         };

    function make3(arg) {

      if (arg == true) { document.getElementById('animate').style.display = "block"; }
      document.getElementById('output').style.display = "block";

      c = 3;
      var threshold = document.getElementById("slider").value;
      document.getElementById('output').innerHTML = threshold;
      var tit = document.getElementById('title');
      tit.innerHTML = "Age at Death of Persons with HIV";
      tit.style.display = "block";
      document.getElementById('slide').style.display = "block";
      svg.selectAll("g").remove();

     var yScale = d3.scaleLinear()
       .domain([0,
         (d3.max(data3, function(d) { return parseInt(d.Count) + 39; }))])
       .range([h - padding, padding]);

     var yAxis = d3.axisLeft()
           .scale(yScale)
           .ticks(20);

     svg.selectAll('text').remove();

     svg.selectAll("text")
        .data(data3.filter(function(d) { return parseInt(d.Year) == threshold; }))
        .enter()
        .append("text")
        .text(function(d) { return d.Group; })
        .attr("class", "text")
        .attr("x", function(d,i) { return i * (w / 17.5) + padding*4.5; })
        .attr("y", function(d) { return yScale(d.Count) + 10; });

     svg.append("g")
         .attr("transform", "translate(" + (padding+30) + ",16)")
         .call(yAxis);

      svg.selectAll("rect").remove();

      svg.selectAll("rect")
            .data(data3.filter(function(d) { return parseInt(d.Year) == threshold; }))
            .enter()
            .append("rect")
            .attr("x", function(d,i) { return i * (w / 17.5) + padding*4.5; })
            .attr("y", function(d) { return padding + yScale(d.Count); })
            .attr("class", "hot")
            .attr("width", 30)
            .attr("height", function(d) { return h - padding - yScale(d.Count); })
            .on("mouseover", function(d) {

              var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
              " people living with HIV between the ages of " + d.Group + " died."
     					var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
     					var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
              tool(xPos, yPos, text);})

   			   .on("mouseout", function() { d3.select("#tooltip").classed("hidden", true); });
        };

     function make4(arg) {

       if (arg == true) { document.getElementById('animate').style.display = "block"; }
       document.getElementById('output').style.display = "block";

       c = 4;
       var threshold = document.getElementById("slider").value;
       document.getElementById('output').innerHTML = threshold;
       var tit = document.getElementById('title');
       tit.innerHTML = "Race of Persons Diagnosed with HIV";
       tit.style.display = "block";
       document.getElementById('slide').style.display = "block";

       svg.selectAll("rect").remove();
       svg.selectAll("g").remove();
       svg.selectAll('text').remove();

       var datalist = [];
       var tot = 0;
       for (var i = 0; i < data4.length; i++) {
         var year = Object.values(data4[i])[0];
         var group = Object.values(data4[i])[2];
         var count = parseInt(Object.values(data4[i])[3]);
         if (year == threshold) { tot += count; datalist.push({Count: count, Group: group}); }
       }

       var parts = [];
       for (var i = 0; i < datalist.length; i++) {
         var p = (datalist[i].Count / tot)*100;
         parts.push({Part: p, Group: datalist[i].Group})
       }
       parts.sort((a, b) => a.Part - b.Part);

       svg.append("rect")
           .attr("class", "legend")
           .attr("width", 100)
           .attr("height", 200)
           .attr("x", 720)
           .attr("y", 0);

       svg.selectAll(".key")
           .data(parts)
           .enter()
           .append("rect")
           .attr("x", 729)
           .attr("y", function(d, i) { return 10 + i * 27; })
           .attr("class", function(d, i) { return cleancirc(d.Group).concat(" key"); })
           .attr("width", 80)
           .attr("height", 18)
           .attr("fill", function(d, i) { return colorcirc(d.Group); })
           .on("mouseover", function(d) {

           var cla = '.' + cleancirc(d.Group);

           d3.selectAll(".arc").selectAll("text")
              .attr("fill", "#E6E6E6");
           d3.selectAll("path")
               .attr("fill", "white");
           d3.selectAll(cla)
               .attr("fill", function(d,i) { if (typeof(d.Group) == "undefined") {
                 return colorcirc(d.data.Group) } else { return colorcirc(d.Group); }; })
           d3.selectAll(".key")
               .attr("fill", "white");
           d3.selectAll(cla)
               .attr("fill", function(d,i) { if (typeof(d.Group) == "undefined") {
                 return colorcirc(d.data.Group) } else { return colorcirc(d.Group); }; })
           d3.selectAll(".text").filter(cla)
                .attr("fill", "black");
           })

           .on("mouseout", function(d) {

           d3.select("#tooltip").classed("hidden", true);

           var cla = '.' + cleancirc(d.Group);
           d3.selectAll(".arc").selectAll("text")
              .attr("fill", "black");
           d3.selectAll("path")
               .attr("fill", function(d, i) { return colorcirc(d.data.Group); })
           d3.selectAll(".key")
               .attr("fill", function(d) { return colorcirc(d.Group); })});

       svg.selectAll("text")
          .data(data4.filter(function(d) { return d.Year == threshold }))
          .enter()
          .append("text")
          .text(function(d,i) { return String(parts[i].Part).substring(0, 5) + " %"; })
          .attr("class", "text")
          .attr("x", 750)
          .attr("y", function(d, i) { return 23 + i * 27; });

       var outerRadius = w / 3.35;
       var innerRadius = w / 5;

       var radius = Math.min(w, h) / 2 - margin;

       var arc = d3.arc()
         .innerRadius(radius * 0.5)
         .outerRadius(radius * 0.9);

       var outerArc = d3.arc()
       	  .innerRadius(radius)
       	  .outerRadius(radius);

       var pie = d3.pie().value(function(d) { return d.Count; });

       color = d3.scaleOrdinal()
          .domain(d3.range(8))
          .range(["#65C2A5", "#FA8E60", "#8DA0CB", "#E789C5", "#FFD930", "#E4C493", "#B3B3B3", "#A8D753"]);

       var data_ready = pie(d3.values(datalist));

       var arcs = svg.selectAll("g.arc")
             .data(data_ready)
             .enter()
             .append("g")
             .attr("class", "arc")
             .attr("transform", "translate(" + w/2 + "," + h/2 + ")");

       arcs.append("path")
           .attr("fill", function(d, i) { return color(i); })
           .attr("class", function(d,i) { return cleancirc(d.data.Group).concat(" ring"); })
           .attr("d", arc)
           .on("mouseover", function(d) {

             var pos = arc.centroid(d)
             if (pos[0] < 0) { pos[0] = w/2 - Math.abs(pos[0]) - padding; }
             else { pos[0] += w/2; }

             var text = "In " + threshold + ", " + formatAsThousands(d.data.Count) +
             " " + d.data.Group + " people were diagnosed with HIV."
             tool(pos[0], pos[1]+365, text);
           })

          .on("mouseout", function() {
           d3.select("#tooltip").classed("hidden", true); });

        // https://www.d3-graph-gallery.com/graph/donut_label.html
        arcs.selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
        .attr("class", "polyline")
        .attr('points', function(d) {
          var posA = arc.centroid(d);
          var posB = outerArc.centroid(d);
          var posC = outerArc.centroid(d);
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
          if (d.data.Group == "Asian") { posB[1] += 20; posC[1] += 20; }
          if (d.data.Group == "Multiple races") { posB[1] += 22; posC[1] += 22; }
          if (d.data.Group == "Native Hawaiian/Pacific Islander") { posB[1] += 11; posC[1] += 11; }
          return [posA, posB, posC]
        })

        arcs.selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
          .text(function(d){ return d.data.Group })
          .attr("class", function(d,i) { return cleancirc(d.data.Group).concat(" text"); })
          .attr('transform', function(d) {
              var pos = outerArc.centroid(d);
              var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
              pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
              if (d.data.Group == "Asian") { pos[1] += 20; }
              if (d.data.Group == "Multiple races") { pos[1] += 22; }
              if (d.data.Group == "Native Hawaiian/Pacific Islander") { pos[1] += 11; }
              return 'translate(' + pos + ')';
          })
          .style('text-anchor', function(d) {
              var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
              return (midangle < Math.PI ? 'start' : 'end')
          })
     }

     function make5(arg) {

       if (arg == true) { document.getElementById('animate').style.display = "block"; }
       document.getElementById('output').style.display = "block";

       c = 5;
       var threshold = document.getElementById("slider").value;
       document.getElementById('output').innerHTML = threshold;
       var tit = document.getElementById('title');
       tit.innerHTML = "Race of Persons Living with HIV";
       tit.style.display = "block";
       document.getElementById('slide').style.display = "block";

       svg.selectAll("rect").remove();
       svg.selectAll("g").remove();
       svg.selectAll('text').remove();

       var datalist = [];
       var tot = 0;
       for (var i = 0; i < data5.length; i++) {
         var year = Object.values(data5[i])[0];
         var group = Object.values(data5[i])[2];
         var count = parseInt(Object.values(data5[i])[3]);
         if (year == threshold) { tot+= count; datalist.push({Count: count, Group: group}); }
       }

       var parts = [];
       for (var i = 0; i < datalist.length; i++) {
         var p = (datalist[i].Count / tot)*100;
         parts.push({Part: p, Group: datalist[i].Group})
       }
       parts.sort((a, b) => a.Part - b.Part);

       svg.append("rect")
           .attr("class", "legend")
           .attr("width", 100)
           .attr("height", 226)
           .attr("x", 720)
           .attr("y", 0);

       svg.selectAll(".key")
           .data(parts)
           .enter()
           .append("rect")
           .attr("x", 729)
           .attr("y", function(d, i) { return 10 + i * 27; })
           .attr("class", function(d, i) { return cleancirc(d.Group).concat(" key"); })
           .attr("width", 80)
           .attr("height", 18)
           .attr("fill", function(d, i) { return colorcirc(d.Group); })
           .on("mouseover", function(d) {

           var cla = '.' + cleancirc(d.Group);

           d3.selectAll(".arc").selectAll("text")
              .attr("fill", "#E6E6E6");
           d3.selectAll("path")
               .attr("fill", "white");
           d3.selectAll(cla)
               .attr("fill", function(d,i) { if (typeof(d.Group) == "undefined") {
                 return colorcirc(d.data.Group) } else { return colorcirc(d.Group); }; })
           d3.selectAll(".key")
               .attr("fill", "white");
           d3.selectAll(cla)
               .attr("fill", function(d,i) { if (typeof(d.Group) == "undefined") {
                 return colorcirc(d.data.Group) } else { return colorcirc(d.Group); }; })
           d3.selectAll(".text").filter(cla)
                .attr("fill", "black");
           })

           .on("mouseout", function(d) {

           d3.select("#tooltip").classed("hidden", true);

           var cla = '.' + cleancirc(d.Group);
           d3.selectAll(".arc").selectAll("text")
              .attr("fill", "black");
           d3.selectAll("path")
               .attr("fill", function(d, i) { return colorcirc(d.data.Group); })
           d3.selectAll(".key")
               .attr("fill", function(d) { return colorcirc(d.Group); })});

       svg.selectAll("text")
          .data(data5.filter(function(d) { return d.Year == threshold }))
          .enter()
          .append("text")
          .text(function(d,i) { return String(parts[i].Part).substring(0, 5) + " %"; })
          .attr("class", "text")
          .attr("x", 750)
          .attr("y", function(d, i) { return 23 + i * 27; });

       var outerRadius = w / 3.35;
       var innerRadius = w / 5;

       var radius = Math.min(w, h) / 2 - margin;

       var arc = d3.arc()
         .innerRadius(radius * 0.5)
         .outerRadius(radius * 0.9);

       var outerArc = d3.arc()
       	  .innerRadius(radius)
       	  .outerRadius(radius);

       var pie = d3.pie().value(function(d) { return d.Count; });

        color = d3.scaleOrdinal()
           .domain(d3.range(8))
           .range(["#65C2A5", "#FA8E60", "#8DA0CB", "#E789C5", "#FFD930", "#E4C493", "#B3B3B3", "#A8D753"]);

       var data_ready = pie(d3.values(datalist));

       var arcs = svg.selectAll("g.arc")
             .data(data_ready)
             .enter()
             .append("g")
             .attr("class", "arc")
             .attr("transform", "translate(" + w/2 + "," + h/2 + ")");

       arcs.append("path")
           .attr("fill", function(d, i) { return color(i); })
           .attr("class", function(d,i) { return cleancirc(d.data.Group).concat(" ring"); })
           .attr("d", arc)
           .on("mouseover", function(d) {

             var pos = arc.centroid(d)
             if (pos[0] < 0) { pos[0] = w/2 - Math.abs(pos[0]) - padding; }
             else { pos[0] += w/2; }

             var text = "In " + threshold + ", " + formatAsThousands(d.data.Count)
             + " " + d.data.Group + " people were living with HIV."
             tool(pos[0], pos[1]+365, text);
           })

          .on("mouseout", function() {
           d3.select("#tooltip").classed("hidden", true); });

       arcs.selectAll('allPolylines')
       .data(data_ready)
       .enter()
       .append('polyline')
       .attr("class", "polyline")
       .attr('points', function(d) {
         var posA = arc.centroid(d);
         var posB = outerArc.centroid(d);
         var posC = outerArc.centroid(d);
         var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
         posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
         if (d.data.Group == "Unknown race") { posB[1] -= 10; posC[1] -= 10; }
         if (d.data.Group == "Asian") { posB[1] += 20; posC[1] += 20; }
         if (d.data.Group == "Multiple races") { posB[1] += 22; posC[1] += 22; }
         if (d.data.Group == "Native Hawaiian/Pacific Islander") { posB[1] += 11; posC[1] += 11; }
         return [posA, posB, posC]
       })

       arcs.selectAll('allLabels')
       .data(data_ready)
       .enter()
       .append('text')
         .text(function(d){ return d.data.Group })
         .attr("class", function(d,i) { return cleancirc(d.data.Group).concat(" text"); })
         .attr('transform', function(d) {
             var pos = outerArc.centroid(d);
             var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
             pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
             if (d.data.Group == "Unknown race") { pos[1] -= 10; }
             if (d.data.Group == "Asian") { pos[1] += 20; }
             if (d.data.Group == "Multiple races") { pos[1] += 22; }
             if (d.data.Group == "Native Hawaiian/Pacific Islander") { pos[1] += 11; }
             return 'translate(' + pos + ')';
         })
         .style('text-anchor', function(d) {
             var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
             return (midangle < Math.PI ? 'start' : 'end')
         });
    }

     function make6(arg) {

       if (arg == true) { document.getElementById('animate').style.display = "block"; }
       document.getElementById('output').style.display = "block";
       c = 6;
       var threshold = document.getElementById("slider").value;
       document.getElementById('output').innerHTML = threshold;
       var tit = document.getElementById('title');
       tit.innerHTML = "Race of Persons Deceased";
       tit.style.display = "block";
       document.getElementById('slide').style.display = "block";

       svg.selectAll("rect").remove();
       svg.selectAll("g").remove();
       svg.selectAll('text').remove();

       var datalist = [];
       var tot = 0;
       for (var i = 0; i < data6.length; i++) {
         var year = Object.values(data6[i])[0];
         var group = Object.values(data6[i])[2];
         var count = parseInt(Object.values(data6[i])[3]);
         if (year == threshold) { tot += count; datalist.push({Count: count, Group: group}); }
       }

       var parts = [];
       for (var i = 0; i < datalist.length; i++) {
         var p = (datalist[i].Count / tot)*100;
         parts.push({Part: p, Group: datalist[i].Group})
       }
       parts.sort((a, b) => a.Part - b.Part);

       svg.append("rect")
           .attr("class", "legend")
           .attr("width", 100)
           .attr("height", 200)
           .attr("x", 720)
           .attr("y", 0);

       svg.selectAll(".key")
           .data(parts)
           .enter()
           .append("rect")
           .attr("x", 729)
           .attr("y", function(d, i) { return 10 + i * 27; })
           .attr("class", function(d, i) { return cleancirc(d.Group).concat(" key"); })
           .attr("width", 80)
           .attr("height", 18)
           .attr("fill", function(d, i) { return colorcirc(d.Group); })
           .on("mouseover", function(d) {

           var cla = '.' + cleancirc(d.Group);

           d3.selectAll(".arc").selectAll("text")
              .attr("fill", "#E6E6E6");
           d3.selectAll("path")
               .attr("fill", "white");
           d3.selectAll(cla)
               .attr("fill", function(d,i) { if (typeof(d.Group) == "undefined") {
                 return colorcirc(d.data.Group) } else { return colorcirc(d.Group); }; })
           d3.selectAll(".key")
               .attr("fill", "white");
           d3.selectAll(cla)
               .attr("fill", function(d,i) { if (typeof(d.Group) == "undefined") {
                 return colorcirc(d.data.Group) } else { return colorcirc(d.Group); }; })
           d3.selectAll(".text").filter(cla)
                .attr("fill", "black");
           })

           .on("mouseout", function(d) {

           d3.select("#tooltip").classed("hidden", true);

           var cla = '.' + cleancirc(d.Group);
           d3.selectAll(".arc").selectAll("text")
              .attr("fill", "black");
           d3.selectAll("path")
               .attr("fill", function(d, i) { return colorcirc(d.data.Group); })
           d3.selectAll(".key")
               .attr("fill", function(d) { return colorcirc(d.Group); })});

       svg.selectAll("text")
          .data(data6.filter(function(d) { return d.Year == threshold }))
          .enter()
          .append("text")
          .text(function(d,i) { return String(parts[i].Part).substring(0, 5) + " %"; })
          .attr("class", "text")
          .attr("x", 750)
          .attr("y", function(d, i) { return 23 + i * 27; });

       var outerRadius = w / 3.35;
       var innerRadius = w / 5;

       var radius = Math.min(w, h) / 2 - margin;

       var arc = d3.arc()
         .innerRadius(radius * 0.5)
         .outerRadius(radius * 0.9);

       var outerArc = d3.arc()
       	  .innerRadius(radius)
       	  .outerRadius(radius);

       var pie = d3.pie().value(function(d) { return d.Count; });

      color = d3.scaleOrdinal()
         .domain(d3.range(8))
         .range(["#65C2A5", "#FA8E60", "#8DA0CB", "#E789C5", "#FFD930", "#E4C493", "#B3B3B3", "#A8D753"]);

       var data_ready = pie(d3.values(datalist));

       var arcs = svg.selectAll("g.arc")
             .data(data_ready)
             .enter()
             .append("g")
             .attr("class", "arc")
             .attr("transform", "translate(" + w/2 + "," + h/2 + ")");

       arcs.append("path")
           .attr("fill", function(d, i) { return color(i); })
           .attr("class", function(d,i) { return cleancirc(d.data.Group).concat(" ring"); })
           .attr("d", arc)
           .on("mouseover", function(d) {

             var pos = arc.centroid(d)
             if (pos[0] < 0) { pos[0] = w/2 - Math.abs(pos[0]) - padding; }
             else { pos[0] += w/2; }

             var text = "In " + threshold + ", " + formatAsThousands(d.data.Count)
             + " " + d.data.Group + " people living with HIV died."
             tool(pos[0], pos[1]+365, text);
           })
          .on("mouseout", function() {
           d3.select("#tooltip").classed("hidden", true); });

       arcs.selectAll('allPolylines')
       .data(data_ready)
       .enter()
       .append('polyline')
       .attr("class", "polyline")
       .attr('points', function(d) {
         var posA = arc.centroid(d);
         var posB = outerArc.centroid(d);
         var posC = outerArc.centroid(d);
         var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
         posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
         if (d.data.Group == "Asian") { posB[1] += 20; posC[1] += 20; }
         if (d.data.Group == "Multiple races") { posB[1] += 22; posC[1] += 22; }
         if (d.data.Group == "Native Hawaiian/Pacific Islander") { posB[1] += 11; posC[1] += 11; }
         return [posA, posB, posC]
       })

       arcs.selectAll('allLabels')
       .data(data_ready)
       .enter()
       .append('text')
         .text(function(d){ return d.data.Group })
         .attr("class", function(d,i) { return cleancirc(d.data.Group).concat(" text"); })
         .attr('transform', function(d) {
             var pos = outerArc.centroid(d);
             var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
             pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
             if (d.data.Group == "Asian") { pos[1] += 20; }
             if (d.data.Group == "Multiple races") { pos[1] += 22; }
             if (d.data.Group == "Native Hawaiian/Pacific Islander") { pos[1] += 11; }
             return 'translate(' + pos + ')';
         })
         .style('text-anchor', function(d) {
             var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
             return (midangle < Math.PI ? 'start' : 'end')
         })
    }

    function make7(arg) {

        if (arg == true) { document.getElementById('animate').style.display = "block"; }
        document.getElementById('output').style.display = "block";

        c = 7;
        var threshold = document.getElementById("slider").value;
        document.getElementById('output').innerHTML = threshold;
        var tit = document.getElementById('title');
        tit.innerHTML = "Transmission Type of Diagnosed Persons";
        tit.style.display = "block";
        document.getElementById('slide').style.display = "block";
        svg.selectAll("g").remove();

        var ga = d3.select("svg").append("g").attr("id","a");
        var gb = d3.select("svg").append("g").attr("id","b");
        var gc = d3.select("svg").append("g").attr("id","c");

       var yScale = d3.scaleLinear()
          .domain([0, 5000])
          .range([h - padding, padding]);

       var yAxis = d3.axisLeft()
           .scale(yScale)
           .ticks(20);

       var men = [];
       var women = [];
       var kids = [];
       var lastman, lastwoman, lastkid;

       for (var i = 0; i < data7.length; i++) {
         var year = Object.values(data7[i])[0];
         var cat = Object.values(data7[i])[1];
         var type = Object.values(data7[i])[2];
         var count = parseInt(Object.values(data7[i])[3]);

         if ((year == threshold) && (cat == "Transmission Category: Male Adult or Adolescent")) {
           var next = yScale(count);
           if (men.length == 0) { men.push(next); }
           else { men.push(men[men.length - 1] - (h - padding - next)); }
           lastman = men[men.length-1];
         }

         if ((year == threshold) && (cat == "Transmission Category: Female Adult or Adolescent")) {
           var nextlady = yScale(count);
           if (women.length == 0) { women.push(nextlady); }
           else { women.push(women[women.length - 1] - (h - padding - nextlady)); }
           lastwoman = women[women.length-1];
         }

         if ((year == threshold) && (cat == "Transmission Category: Child (<12 Years Old at the End of Year)")) {
           var nextkid = yScale(count);
           if (kids.length == 0) { kids.push(nextkid); }
           else { kids.push(kids[kids.length - 1] - (h - padding - nextkid)); }
           lastkid = kids[kids.length-1];
         }
       }

      svg.selectAll("rect").remove();

      svg.append("rect")
          .attr("class", "legend")
          .attr("width", 226)
          .attr("height", 226)
          .attr("x", 595)
          .attr("y", 17);

      svg.selectAll(".key")
          .data(data7.filter(function(d) { return parseInt(d.Year) == threshold
            && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
          .enter()
          .append("rect")
          .attr("x", 600)
          .attr("y", function(d, i) { return 215 + i * -27; })
          .attr("class", function(d, i) { return clean(d.Group).concat(" key"); })
          .attr("width", 215)
          .attr("height", 18)
          .attr("fill", function(d, i) { return colorize(d.Group); })
          .on("mouseover", function(d) {

          var cla = '.' + clean(d.Group);

          d3.selectAll("g").selectAll("rect")
              .attr("fill", "white");
          d3.selectAll(".key")
              .attr("fill", "white");
          d3.selectAll("g").selectAll(cla)
              .attr("fill", function(d, i) { return colorize(d.Group); })
          d3.selectAll(cla)
              .attr("fill", function(d, i) { return colorize(d.Group); })
          })

          .on("mouseout", function(d) {

          d3.select("#tooltip").classed("hidden", true);

          var cla = '.' + clean(d.Group);
          d3.selectAll("g").selectAll("rect")
              .attr("fill", function(d, i) { return colorize(d.Group); })
          d3.selectAll(".key")
              .attr("fill", function(d) { return colorize(d.Group); })});

      ga.selectAll("rect")
            .data(data7.filter(function(d) { return d.Year == threshold
              && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
            .enter()
            .append("rect")
            .attr("x", 160)
            .attr("y", function(d, i) { return men[i] + padding; })
            .attr("fill", function(d, i) { return colorize(d.Group); })
            .attr("class", function(d, i) { return clean(d.Group); })
            .attr("stroke", "black")
            .attr("stoke-width", 0.75)
            .attr("width", 100)
            .attr("height", function(d) { return (h - padding - yScale(d.Count)); })
            .on("mouseover", function(d) {

              var cla = '.' + clean(d.Group);
              ga.select(cla)
                .attr("stroke", "white");

              var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
              var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
              var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
              " males were diagnosed with HIV transmitted via " + cleanish(d.Group) + "."
              tool(xPos, yPos, text);

             })
           .on("mouseout", function(d) {
             var cla = '.' + clean(d.Group);
             ga.select(cla)
               .attr("stroke", "black");
            d3.select("#tooltip").classed("hidden", true); });

        gb.selectAll("rect")
              .data(data7.filter(function(d) { return parseInt(d.Year) == threshold
                && d.Category == "Transmission Category: Female Adult or Adolescent"; }))
              .enter()
              .append("rect")
              .attr("x", 395)
              .attr("y", function(d, i) { return women[i] + padding; })
              .attr("fill", function(d, i) { return colorize(d.Group); })
              .attr("class", function(d, i) { return clean(d.Group); })
              .attr("stroke", "black")
              .attr("stoke-width", 0.75)
              .attr("width", 100)
              .attr("height", function(d) { return h - padding - yScale(d.Count); })
              .on("mouseover", function(d) {

                var cla = '.' + clean(d.Group);
                gb.select(cla)
                  .attr("stroke", "white");

                var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
                var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
                " females were diagnosed with HIV transmitted via " + cleanish(d.Group) + "."
              tool(xPos, yPos, text);
            })
             .on("mouseout", function(d) {
               var cla = '.' + clean(d.Group);
               gb.select(cla)
                 .attr("stroke", "black");
              d3.select("#tooltip").classed("hidden", true); });

          gc.selectAll("rect")
                .data(data7.filter(function(d) { return parseInt(d.Year) == threshold
                  && d.Category == "Transmission Category: Child (<12 Years Old at the End of Year)"; }))
                .enter()
                .append("rect")
                .attr("x", 630)
                .attr("y", function(d, i) { return kids[i] + padding; })
                .attr("fill", function(d, i) { return colorize(d.Group); })
                .attr("class", function(d, i) { return clean(d.Group); })
                .attr("stroke", "black")
                .attr("stoke-width", 0.75)
                .attr("width", 100)
                .attr("height", function(d) { return h - padding - yScale(d.Count); })
                .on("mouseover", function(d) {

                  var cla = '.' + clean(d.Group);
                  gc.select(cla)
                    .attr("stroke", "white");

                  var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                  var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
                  var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
                  " children were diagnosed with HIV transmitted via " + cleanish(d.Group) + "."
                  tool(xPos, yPos, text);
               })
               .on("mouseout", function(d) {
                 var cla = '.' + clean(d.Group);
                 gc.select(cla)
                   .attr("stroke", "black");
                d3.select("#tooltip").classed("hidden", true); });

         svg.selectAll('text').remove();

         svg.selectAll("text")
            .data(data7.filter(function(d) { return d.Year == threshold
              && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
            .enter()
            .append("text")
            .text(function(d) { return cleanish(d.Group); })
            .attr("class", "text")
            .attr("x", 625)
            .attr("y", function(d, i) { return 228 + i * -27; });

        svg.append("text")
           .attr("x", 155)
           .attr("y", lastman+5)
           .attr("class", "text")
           .text("Male Adult/Adolescent");

         svg.append("text")
            .attr("x", 385)
            .attr("y", lastwoman+5)
            .attr("class", "text")
            .text("Female Adult/Adolescent");

        svg.append("text")
           .attr("x", 631)
           .attr("y", lastkid+5)
           .attr("class", "text")
           .text("Child <12 Years Old");

         svg.append("g")
             .attr("transform", "translate(" + (padding+30) + ",16)")
             .call(yAxis);
       }

     function make8(arg) {

         if (arg == true) { document.getElementById('animate').style.display = "block"; }
         document.getElementById('output').style.display = "block";

         c = 8;
         var threshold = document.getElementById("slider").value;
         document.getElementById('output').innerHTML = threshold;
         var tit = document.getElementById('title');
         tit.innerHTML = "Transmission Type of Living Persons";
         tit.style.display = "block";
         document.getElementById('slide').style.display = "block";
         svg.selectAll("g").remove();

         var ga = d3.select("svg").append("g").attr("id","a");
         var gb = d3.select("svg").append("g").attr("id","b");
         var gc = d3.select("svg").append("g").attr("id","c");

        var yScale = d3.scaleLinear()
           .domain([0, 125000])
           .range([h - padding, padding]);

        var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(20);

        var men = [];
        var women = [];
        var kids = [];
        var lastman, lastwoman, lastkid;

        for (var i = 0; i < data8.length; i++) {
          var year = Object.values(data8[i])[0];
          var cat = Object.values(data8[i])[1];
          var type = Object.values(data8[i])[2];
          var count = parseInt(Object.values(data8[i])[3]);

          if ((year == threshold) && (cat == "Transmission Category: Male Adult or Adolescent")) {
            var next = yScale(count);
            if (men.length == 0) { men.push(next); }
            else { men.push(men[men.length - 1] - (h - padding - next)); }
            lastman = men[men.length-1];
          }

          if ((year == threshold) && (cat == "Transmission Category: Female Adult or Adolescent")) {
            var nextlady = yScale(count);
            if (women.length == 0) { women.push(nextlady); }
            else { women.push(women[women.length - 1] - (h - padding - nextlady)); }
            lastwoman = women[women.length-1];
          }

          if ((year == threshold) && (cat == "Transmission Category: Child (<12 Years Old at the End of Year)")) {
            var nextkid = yScale(count);
            if (kids.length == 0) { kids.push(nextkid); }
            else { kids.push(kids[kids.length - 1] - (h - padding - nextkid)); }
            lastkid = kids[kids.length-1];
          }
        }

       svg.selectAll("rect").remove();

       svg.append("rect")
           .attr("class", "legend")
           .attr("width", 226)
           .attr("height", 226)
           .attr("x", 595)
           .attr("y", 17);

       svg.selectAll(".key")
           .data(data8.filter(function(d) { return parseInt(d.Year) == threshold
             && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
           .enter()
           .append("rect")
           .attr("x", 600)
           .attr("y", function(d, i) { return 215 + i * -27; })
           .attr("class", function(d, i) { return clean(d.Group).concat(" key"); })
           .attr("width", 215)
           .attr("height", 18)
           .attr("fill", function(d, i) { return colorize(d.Group); })
           .on("mouseover", function(d) {

           var cla = '.' + clean(d.Group);

           d3.selectAll("g").selectAll("rect")
               .attr("fill", "white");
           d3.selectAll(".key")
               .attr("fill", "white");
           d3.selectAll("g").selectAll(cla)
               .attr("fill", function(d, i) { return colorize(d.Group); })
           d3.selectAll(cla)
               .attr("fill", function(d, i) { return colorize(d.Group); })
           })

           .on("mouseout", function(d) {

           d3.select("#tooltip").classed("hidden", true);

           var cla = '.' + clean(d.Group);
           d3.selectAll("g").selectAll("rect")
               .attr("fill", function(d, i) { return colorize(d.Group); })
           d3.selectAll(".key")
               .attr("fill", function(d) { return colorize(d.Group); })});

       ga.selectAll("rect")
             .data(data8.filter(function(d) { return d.Year == threshold
               && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
             .enter()
             .append("rect")
             .attr("x", 160)
             .attr("y", function(d, i) { return men[i] + padding; })
             .attr("fill", function(d, i) { return colorize(d.Group); })
             .attr("class", function(d, i) { return clean(d.Group); })
             .attr("stroke", "black")
             .attr("stoke-width", 0.75)
             .attr("width", 100)
             .attr("height", function(d) { return (h - padding - yScale(d.Count)); })
             .on("mouseover", function(d) {

               var cla = '.' + clean(d.Group);
               ga.select(cla)
                 .attr("stroke", "white");

               var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
               var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
               var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
               " males were living with HIV transmitted via " + cleanish(d.Group) + "."
               tool(xPos, yPos, text);
            })
            .on("mouseout", function(d) {
              var cla = '.' + clean(d.Group);
              ga.select(cla)
                .attr("stroke", "black");
             d3.select("#tooltip").classed("hidden", true); });

         gb.selectAll("rect")
               .data(data8.filter(function(d) { return parseInt(d.Year) == threshold
                 && d.Category == "Transmission Category: Female Adult or Adolescent"; }))
               .enter()
               .append("rect")
               .attr("x", 395)
               .attr("y", function(d, i) { return women[i] + padding; })
               .attr("fill", function(d, i) { return colorize(d.Group); })
               .attr("class", function(d, i) { return clean(d.Group); })
               .attr("stroke", "black")
               .attr("stoke-width", 0.75)
               .attr("width", 100)
               .attr("height", function(d) { return h - padding - yScale(d.Count); })
               .on("mouseover", function(d) {

                 var cla = '.' + clean(d.Group);
                 gb.select(cla)
                   .attr("stroke", "white");

                 var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                 var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
                 var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
                 " females were living with HIV transmitted via " + cleanish(d.Group) + "."
                 tool(xPos, yPos, text);
               })
              .on("mouseout", function(d) {
                var cla = '.' + clean(d.Group);
                gb.select(cla)
                  .attr("stroke", "black");
               d3.select("#tooltip").classed("hidden", true); });

           gc.selectAll("rect")
                 .data(data8.filter(function(d) { return parseInt(d.Year) == threshold
                   && d.Category == "Transmission Category: Child (<12 Years Old at the End of Year)"; }))
                 .enter()
                 .append("rect")
                 .attr("x", 630)
                 .attr("y", function(d, i) { return kids[i] + padding; })
                 .attr("fill", function(d, i) { return colorize(d.Group); })
                 .attr("class", function(d, i) { return clean(d.Group); })
                 .attr("stroke", "black")
                 .attr("stoke-width", 0.75)
                 .attr("width", 100)
                 .attr("height", function(d) { return h - padding - yScale(d.Count); })
                 .on("mouseover", function(d) {

                   var cla = '.' + clean(d.Group);
                   gc.select(cla)
                     .attr("stroke", "white");

                   var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                   var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
                   var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
                   " children were living with HIV transmitted via " + cleanish(d.Group) + "."
                   tool(xPos, yPos, text);
                 })
                .on("mouseout", function(d) {
                  var cla = '.' + clean(d.Group);
                  gc.select(cla)
                    .attr("stroke", "black");
                 d3.select("#tooltip").classed("hidden", true); });

          svg.selectAll('text').remove();

          svg.selectAll("text")
             .data(data8.filter(function(d) { return d.Year == threshold
               && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
             .enter()
             .append("text")
             .text(function(d) { return cleanish(d.Group); })
             .attr("class", "text")
             .attr("x", 625)
             .attr("y", function(d, i) { return 228 + i * -27; });

         svg.append("text")
            .attr("x", 155)
            .attr("y", lastman+5)
            .attr("class", "text")
            .text("Male Adult/Adolescent");

          svg.append("text")
             .attr("x", 385)
             .attr("y", lastwoman+5)
             .attr("class", "text")
             .text("Female Adult/Adolescent");

         svg.append("text")
            .attr("x", 631)
            .attr("y", lastkid+5)
            .attr("class", "text")
            .text("Child <12 Years Old");

          svg.append("g")
              .attr("transform", "translate(" + (padding+30) + ",16)")
              .call(yAxis);
       }

      function make9(arg) {

          if (arg == true) { document.getElementById('animate').style.display = "block"; }
          document.getElementById('output').style.display = "block";

          c = 9;
          var threshold = document.getElementById("slider").value;
          document.getElementById('output').innerHTML = threshold;
          var tit = document.getElementById('title');
          tit.innerHTML = "Transmission Type of Deceased Persons";
          tit.style.display = "block";
          document.getElementById('slide').style.display = "block";
          svg.selectAll("g").remove();

          var ga = d3.select("svg").append("g").attr("id","a");
          var gb = d3.select("svg").append("g").attr("id","b");

         var yScale = d3.scaleLinear()
            .domain([0, 1700])
            .range([h - padding, padding]);

         var yAxis = d3.axisLeft()
             .scale(yScale)
             .ticks(20);

         var men = [];
         var women = [];
         var lastman, lastwoman;

         for (var i = 0; i < data9.length; i++) {
           var year = Object.values(data9[i])[0];
           var cat = Object.values(data9[i])[1];
           var type = Object.values(data9[i])[2];
           var count = parseInt(Object.values(data9[i])[3]);

           if ((year == threshold) && (cat == "Transmission Category: Male Adult or Adolescent")) {
             var next = yScale(count);
             if (men.length == 0) { men.push(next); }
             else { men.push(men[men.length - 1] - (h - padding - next)); }
             lastman = men[men.length-1];
           }

           if ((year == threshold) && (cat == "Transmission Category: Female Adult or Adolescent")) {
             var nextlady = yScale(count);
             if (women.length == 0) { women.push(nextlady); }
             else { women.push(women[women.length - 1] - (h - padding - nextlady)); }
             lastwoman = women[women.length-1];
           }
         }

        svg.selectAll("rect").remove();

        svg.append("rect")
            .attr("class", "legend")
            .attr("width", 226)
            .attr("height", 226)
            .attr("x", 595)
            .attr("y", 17);

        svg.selectAll(".key")
            .data(data9.filter(function(d) { return parseInt(d.Year) == threshold
              && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
            .enter()
            .append("rect")
            .attr("x", 600)
            .attr("y", function(d, i) { return 215 + i * -27; })
            .attr("class", function(d, i) { return clean(d.Group).concat(" key"); })
            .attr("width", 215)
            .attr("height", 18)
            .attr("fill", function(d, i) { return colorize(d.Group); })
            .on("mouseover", function(d) {

            var cla = '.' + clean(d.Group);

            d3.selectAll("g").selectAll("rect")
                .attr("fill", "white");
            d3.selectAll(".key")
                .attr("fill", "white");
            d3.selectAll("g").selectAll(cla)

                .attr("fill", function(d, i) { return colorize(d.Group); })
            d3.selectAll(cla)
                .attr("fill", function(d, i) { return colorize(d.Group); })
            })

            .on("mouseout", function(d) {

            d3.select("#tooltip").classed("hidden", true);

            var cla = '.' + clean(d.Group);
            d3.selectAll("g").selectAll("rect")
                .attr("fill", function(d, i) { return colorize(d.Group); })
            d3.selectAll(".key")
                .attr("fill", function(d) { return colorize(d.Group); })});

        ga.selectAll("rect")
              .data(data9.filter(function(d) { return d.Year == threshold
                && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
              .enter()
              .append("rect")
              .attr("x", 160)
              .attr("y", function(d, i) { return men[i] + padding; })
              .attr("fill", function(d, i) { return colorize(d.Group); })
              .attr("class", function(d, i) { return clean(d.Group); })
              .attr("stroke", "black")
              .attr("stoke-width", 0.75)
              .attr("width", 100)
              .attr("height", function(d) { return (h - padding - yScale(d.Count)); })
              .on("mouseover", function(d) {

                var cla = '.' + clean(d.Group);
                ga.select(cla).attr("stroke", "white");

                var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
                var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
                " males with HIV transmitted via " + cleanish(d.Group) + " died."
                tool(xPos, yPos, text);
              })
             .on("mouseout", function(d) {
               var cla = '.' + clean(d.Group);
               ga.select(cla).attr("stroke", "black");
               d3.select("#tooltip").classed("hidden", true); });

          gb.selectAll("rect")
                .data(data9.filter(function(d) { return parseInt(d.Year) == threshold
                  && d.Category == "Transmission Category: Female Adult or Adolescent"; }))
                .enter()
                .append("rect")
                .attr("x", 395)
                .attr("y", function(d, i) { return women[i] + padding; })
                .attr("fill", function(d, i) { return colorize(d.Group); })
                .attr("class", function(d, i) { return clean(d.Group); })
                .attr("stroke", "black")
                .attr("stoke-width", 0.75)
                .attr("width", 100)
                .attr("height", function(d) { return h - padding - yScale(d.Count); })
                .on("mouseover", function(d) {

                  var cla = '.' + clean(d.Group);
                  gb.select(cla)
                    .attr("stroke", "white");

                  var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                  var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + padding;
                  var text = "In " + threshold + ", " + formatAsThousands(d.Count) +
                  " females with HIV transmitted via " + cleanish(d.Group) + " died."
                  tool(xPos, yPos, text);
                })
               .on("mouseout", function(d) {
                 var cla = '.' + clean(d.Group);
                 gb.select(cla)
                   .attr("stroke", "black");
                d3.select("#tooltip").classed("hidden", true); });

           svg.selectAll('text').remove();

           svg.selectAll("text")
              .data(data9.filter(function(d) { return d.Year == threshold
                && d.Category == "Transmission Category: Male Adult or Adolescent"; }))
              .enter()
              .append("text")
              .text(function(d) { return cleanish(d.Group); })
              .attr("class", "text")
              .attr("x", 625)
              .attr("y", function(d, i) { return 228 + i * -27; });

          svg.append("text")
             .attr("x", 155)
             .attr("y", lastman+5)
             .attr("class", "text")
             .text("Male Adult/Adolescent");

           svg.append("text")
              .attr("x", 385)
              .attr("y", lastwoman+5)
              .attr("class", "text")
              .text("Female Adult/Adolescent");

           svg.append("g")
               .attr("transform", "translate(" + (padding+30) + ",16)")
               .call(yAxis);
        }
