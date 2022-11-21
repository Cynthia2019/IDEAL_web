import * as d3 from "d3";

const MARGIN = {
  TOP: 10,
  RIGHT: 10,
  BOTTOM: 10,
  LEFT: 10,
};
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 800 - MARGIN.TOP - MARGIN.BOTTOM;

class Scatter {
  constructor(element, data, setData, query1, query2) {
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
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Number of Viewers");

    // Append group el to display both axes
    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    // Append group el to display both axes
    this.yAxisGroup = this.svg.append("g");

    d3.csv(
      "../data/sample.csv"
    ).then((data) => {
      this.data = data;
      this.update(data, this.setData, "Minimal directional Young's modulus [N/m]", "Maximal directional Young's modulus [N/m]");
    });
  }
  //query1: x-axis
  //query2: y-axis
  update(data, setData, query1, query2) {
    this.data = data;
    this.setData = setData;
    this.query1 = query1;
    this.query2 = query2;
    this.setData(this.data);

    let res = [];

    switch (this.query2) {
      case "Maximal directional Young's modulus [N/m]":
        res = this.data; 
        break;
      default:
        break;
    }

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(res, (d) => d[this.query2])])
      // Flip left axis values to ascend
      // rather than to descend by default.
      .range([0, HEIGHT]);

    const x = d3
      .scaleLinear()
      .domain([0, res.map((d) => d[this.query1])])
      .range([0, WIDTH]);

    const xAxisCall = d3.axisBottom(x);
    this.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    this.yAxisGroup.transition().duration(500).call(yAxisCall);
  }
}

export default Scatter;