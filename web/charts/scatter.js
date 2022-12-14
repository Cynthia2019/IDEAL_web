import * as d3 from "d3";

const circleOriginalSize = 5;
const circleFocusSize = 7;

const SIZE = 600;

const MARGIN = {
  TOP: 50,
  RIGHT: 20,
  BOTTOM: 50,
  LEFT: 100,
};
const WIDTH = SIZE - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = SIZE - MARGIN.TOP - MARGIN.BOTTOM;

const colors = ["#8A8BD0", "#FFB347", "#89CFF0"];

function expo(x, f) {
  if (x < 1000 && x > -1000) return x;
  return Number(x).toExponential(f);
}

class Scatter {
  constructor(element, data, setDataPoint) {
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("class", "scatter-plot-plot")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // Labels
    this.xLabel = this.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle");

    this.yLabel = this.svg
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -80)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)");

    // Append group el to display both axes
    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    // Append group el to display both axes
    this.yAxisGroup = this.svg.append("g");

    this.update(data, element, setDataPoint, this.query1, this.query2);
  }
  //query1: x-axis
  //query2: y-axis
  update(data, element, setDataPoint, query1, query2) {
    this.data = data;
    this.query1 = query1;
    this.query2 = query2;
    let datasets = [];
    data.map((d, i) => {
      for (let data of d.data) {
        data.name = d.name;
        data.color = colors[i];
      }
      datasets.push(d.data);
    });
    let finalData = [].concat(...datasets);
    d3.select(element).select(".tooltip").remove();
    d3.selectAll("circle").remove();
    let yScale = d3
      .scaleLinear()
      .domain([
        d3.min(finalData, (d) => d[query2]),
        d3.max(finalData, (d) => d[query2]),
      ])
      .range([HEIGHT, 0]);

    let xScale = d3
      .scaleLinear()
      .domain([
        d3.min(finalData, (d) => d[query1]),
        d3.max(finalData, (d) => d[query1]),
      ])
      .range([0, WIDTH]);

    // Add a clipPath: everything out of this area won't be drawn.
    let clip = this.svg
      .append("defs")
      .append("SVG:clipPath")
      .attr("id", "clip")
      .append("SVG:rect")
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .attr("x", 0)
      .attr("y", 0);

    let xAxisCall = d3.axisBottom(xScale).tickFormat((x) => `${expo(x, 2)}`);
    let xAxisGroup = this.xAxisGroup;
    xAxisGroup.transition().duration(500).call(xAxisCall);

    let yAxisCall = d3.axisLeft(yScale).tickFormat((y) => `${expo(y, 2)}`);
    let yAxisGroup = this.yAxisGroup;
    yAxisGroup.transition().duration(500).call(yAxisCall);
    this.xLabel.text(this.query1);
    this.yLabel.text(this.query2);

    let tooltip = d3
      .select(element)
      .append("div")
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("visibility", "hidden");

    let mouseover = function (e, d) {
      d3.select(this)
        .attr("r", circleFocusSize)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("fill-opacity", 1);
      setDataPoint(d);
      tooltip.style("visibility", "visible").transition().duration(200);
    };

    let mousemove = function (e, d) {
      tooltip
        .html(
          "Dataset: " +
            d["name"] +
            "<br>symmetry: " +
            d["symmetry"] +
            "<br>Material_0: " +
            d.material_0 +
            "<br>Material_1: " +
            d.material_1 +
            `<br>${query1}: ` +
            d[query1] +
            `<br>${query2}: ` +
            d[query2]
        )
        .style("top", e.pageY + 10 + "px")
        .style("left", e.pageX + 10 + "px");
    };

    let mouseleave = function (e, d) {
      tooltip.style("visibility", "hidden").transition().duration(200);
      d3.select(this)
        .attr("r", circleOriginalSize)
        .style("stroke", "none")
        .style("stroke-width", 2)
        .style("fill-opacity", 0.8);
    };

    // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
    let zoom = d3
      .zoom()
      .scaleExtent([1, 20]) // This control how much you can unzoom (x1) and zoom (x20)
      .extent([
        [0, 0],
        [WIDTH, HEIGHT],
      ])
      .on("zoom", function (event) {
        // recover the new scale
        let newXScale = event.transform.rescaleX(xScale);
        let newYScale = event.transform.rescaleY(yScale);

        // update axes with these new boundaries
        let xAxisCall = d3
          .axisBottom(newXScale)
          .tickFormat((x) => `${expo(x, 2)}`);
        let yAxisCall = d3
          .axisLeft(newYScale)
          .tickFormat((y) => `${expo(y, 2)}`);
        xAxisGroup.call(xAxisCall);
        yAxisGroup.call(yAxisCall);

        d3.selectAll("circle")
          .data(finalData)
          .attr("cy", (d) => newYScale(d[query2]))
          .attr("cx", (d) => newXScale(d[query1]));
      });

    this.svg
      .append("rect")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
      .call(zoom);
    let circles = this.svg
      .append("g")
      .attr("clip-path", "url(#clip)")
      .selectAll("circle")
      .data(finalData);
    circles.exit().transition().attr("r", 0).remove();
    circles
      .enter()
      .append("circle")
      .join(circles)
      .attr("r", circleOriginalSize)
      .attr("fill", (d) => d.color)
      .style("stroke", "none")
      .style("stroke-width", 2)
      .style("fill-opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .transition()
      .duration(500)
      .attr("cx", (d) => xScale(d[query1]))
      .attr("cy", (d) => yScale(d[query2]));

    circles.exit().transition().attr("r", 0).remove();
  }
}

export default Scatter;
