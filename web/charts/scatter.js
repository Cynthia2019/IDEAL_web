import * as d3 from "d3";

const MARGIN = {
  TOP: 100,
  RIGHT: 50,
  BOTTOM: 100,
  LEFT: 100,
};
const WIDTH = 900 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 900 - MARGIN.TOP - MARGIN.BOTTOM;

class Scatter {
  constructor(element, data, setDataPoint) {
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.RIGHT})`)

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

    this.update(data, setDataPoint, "C11", "C12");
  }
  //query1: x-axis
  //query2: y-axis
  update(data, setDataPoint, query1, query2) {
    this.data = data;
    this.query1 = query1;
    this.query2 = query2;
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(this.data, (d) => d[query2]),
        d3.max(this.data, (d) => d[query2]),
      ])
      .range([HEIGHT, 0]);

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(this.data, (d) => d[query1]),
        d3.max(this.data, (d) => d[query1]),
      ])
      .range([0, WIDTH]);

    const xAxisCall = d3.axisBottom(xScale);
    this.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(yScale);
    this.yAxisGroup.transition().duration(500).call(yAxisCall);
    this.xLabel.text(this.query1);
    this.yLabel.text(this.query2);

    const tooltip = this.svg
      .append("div")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");
    var mouseover = function (d, i) {
      d3.select(this)
        .attr("r", 5)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("fill-opacity", 1)
      // tooltip.style("opacity", 1)
      setDataPoint(i);
    };

    var mouseleave = function (d, i) {
      d3.select(this)
        .attr("r", 2)
        .style("stroke", "none")
        .style("stroke-width", 0)
        .style("fill-opacity", 0.5)
      // tooltip.style("opacity", 0)
    };

    this.data = this.data.filter((d, i) => (i < 1000)); 
    const circles = this.svg.selectAll("circle").data(this.data);
    circles
      .enter()
      .append("circle")
      .merge(circles)
      .attr("r", 2)
      .attr("fill", "#8A8BD0")
      .style("stroke", "none")
      .style("stroke-width", 0)
      .style("fill-opacity", 0.5)
      .transition()
      .duration(500)
      .attr("cx", (d) => xScale(d[query1]))
      .attr("cy", (d) => yScale(d[query2]));

    circles.on("mouseover", mouseover).on("mouseleave", mouseleave);

    circles.exit().remove();
  }
}

export default Scatter;
