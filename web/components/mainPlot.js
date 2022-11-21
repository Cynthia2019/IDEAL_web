import * as d3 from "d3";
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

const svg = d3.select("#main-plot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// d3.csv("../data/sample.csv").then(function (data) {
//   var x = d3.scaleLinear().range([0, width]);
//   svg
//     .append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // Add Y axis
//   var y = d3.scaleLinear().range([height, 0]);
//   svg.append("g").call(d3.axisLeft(y));
// });

export default function MainPlot() {
  return <div id="main-plot"></div>;
}
