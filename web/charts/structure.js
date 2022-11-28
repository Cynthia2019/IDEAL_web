import * as d3 from "d3";
const MARGIN = {
  TOP: 100,
  RIGHT: 50,
  BOTTOM: 100,
  LEFT: 100,
};
const SIDE = 300; 
const WIDTH = SIDE - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = SIDE - MARGIN.TOP - MARGIN.BOTTOM;

class Structure {
  constructor(element, data) {
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.RIGHT})`);
    this.update(data);
  }
  update(data) {
    this.data = data.geometry
    let res = []
    res = this.pixelate(data.geometry);
    const yScale = d3.scaleLinear().domain([0, 50]).range([HEIGHT, 0]);

    const xScale = d3.scaleLinear().domain([0, 50]).range([0, WIDTH]);

    const size = SIDE / 50; 

    const pixels = this.svg.selectAll("rect").data(res);
    pixels
      .enter()
      .append("rect")
      .merge(pixels)
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y))
      .attr("width", size)
      .attr("height", size)
      .attr("fill", (d) => d.fill);

    pixels.exit().remove();
  }
  pixelate(data) {
    if(!data) return [];
    const xSquares = 50;
    const ySquares = 50;
    let d = [];
    for (let i = 0; i < xSquares; i++) {
      for (let j = 0; j < ySquares; j++) {
        d.push({
          x: i,
          y: j,
          fill: data[i * xSquares + j] == "0" ? "white" : "black",
        });
      }
    }
    return d;
  }
}

export default Structure;