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
  constructor(element, data, query1, query2) {
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.RIGHT})`);

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

    this.update(data, "C11", "C12");
  }
  //query1: x-axis
  //query2: y-axis
  update(data, query1, query2) {
    this.data = data;
    this.query1 = query1;
    this.query2 = query2;
    let res = [];
    res = this.data.map((d) => [d[query1], d[query2]]);
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(res, (d) => d[1]), d3.max(res, (d) => d[1])])
      .range([HEIGHT, 0]);

    const xScale = d3
      .scaleLinear()
       .domain([d3.min(res, (d) => d[0]), d3.max(res, (d) => d[0])])
      .range([0, WIDTH]);

    const xAxisCall = d3.axisBottom(xScale);
    this.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(yScale);
    this.yAxisGroup.transition().duration(500).call(yAxisCall);
    this.xLabel.text(this.query1);
    this.yLabel.text(this.query2);
    const circles = this.svg.selectAll("circle").data(res);
    circles
      .enter()
      .append("circle")
      .merge(circles)
      .attr("r", 2)
      .attr("fill", '#8A8BD0')
      .style("fill-opacity", 0.3)
      .transition()
      .duration(500)
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))

    circles.exit().remove();
  }
}

export default Scatter;
