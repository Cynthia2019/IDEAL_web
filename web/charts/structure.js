import * as d3 from "d3";
const MARGIN = {
  TOP: 30,
  RIGHT: 30,
  BOTTOM: 30,
  LEFT: 30,
};
const SIDE = 230; 
const WIDTH = SIDE - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = SIDE - MARGIN.TOP - MARGIN.BOTTOM;

class Structure {
  constructor(element, data) {
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .style("z-index", 10)
      .style("margin-top", "30px")
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.RIGHT})`);
    
    this.svg.append("text")
      .attr("x", (WIDTH / 2))             
      .attr("y", 0 - (MARGIN.TOP / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("font-family", 'Arial, sans-serif')
      .text("Unit Cell Geometry");
    this.update(data);
  }
  update(data) {
    this.data = data?.geometry
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
