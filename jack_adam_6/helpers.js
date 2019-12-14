window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; }}

function sliderChange(val) { document.getElementById('output').innerHTML = val; }

// https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function tool(x, y, t) {
  d3.select("#tooltip")
    .style("left", x + "px")
    .style("top", y + "px")
    .select("#value")
    .text(t);
  d3.select("#tooltip").classed("hidden", false);
}

function cleancirc(grooo) {
  var a = grooo.replace(/\s/g, '');
  var b = a.replace(/\//g, '');
  return b;
}

function colorcirc(m) {
  if (m == "Unknown race") { return "#FFD930"; }
  if (m == "Multiple races") { return "#B3B3B3"; }
  if (m == "White") { return "#E4C493"; }
  if (m == "Native Hawaiian/Pacific Islander") { return "#65C2A5"; }
  if (m == "Latinx") { return "#E789C5"; }
  if (m == "Black/African American") { return "#8DA0CB"; }
  if (m == "Asian") { return "#FA8E60"; }
  if (m == "American Indian/Alaska Native") { return "#A8D753"; }
  else { return "#808080"; }
}

function colorize(m) {
  if (m == "Male-to-male sexual contact (MMSC)") { return "#E4C493"; }
  if (m == "Injection drug use (IDU)") { return "#8DA0CB"; }
  if (m == "MMSC and IDU") { return "#65C2A5"; }
  if (m == "High-risk heterosexual contact (HRH)**") { return "#E789C5"; }
  if (m == "Heterosexual contact (Non-HRH)***") { return "#FFD930"; }
  if (m == "Perinatal") { return "#FA8E60"; }
  if (m == "Unknown risk") { return "#B3B3B3"; }
  if (m.substring(0, 3) == "Oth") { return "#A8D753"; }
  else { return "#808080"; }
}

function clean(gro) {
  var a = gro.replace(/\s/g, '');
  var b = a.replace(/\*/g, '');
  var c = b.replace(/\(/g, '');
  var d = c.replace(/\)/g, '');
  var e = d.replace(/\-/g, '');
  return e;
}

function cleanish(groo) { return groo.replace(/\*/g, ''); }
