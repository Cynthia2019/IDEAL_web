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

function expo(x, f) {
  if(x < 1000) return x
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

    this.update(data, element, setDataPoint, this.query1, this.query2);
  }
  //query1: x-axis
  //query2: y-axis
  update(data, element, setDataPoint, query1, query2) {
    this.data = data;
    this.query1 = query1;
    this.query2 = query2;
    d3.select(element).select(".tooltip").remove();
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

    const xAxisCall = d3.axisBottom(xScale).tickFormat(x => `${expo(x, 2)}`);
    this.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(yScale).tickFormat(y => `${expo(y, 2)}`);
    this.yAxisGroup.transition().duration(500).call(yAxisCall);
    this.xLabel.text(this.query1);
    this.yLabel.text(this.query2);

    const tooltip = d3
      .select(element)
      .append("div")
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("visibility", "hidden")
    const mouseover = function (e, d) {
      d3.select(this)
        .attr("r", circleFocusSize)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("fill-opacity", 1);
      setDataPoint(d);
      tooltip.style("visibility", "visible").transition().duration(200);
      
    };

    const mousemove = function (e, d) {
      tooltip
        .html("symmetry: " + d["symmetry"] + "<br>Material_0: " + d.material_0 + "<br>Material_1: " + d.material_1 + `<br>${query1}: ` + d[query1] + `<br>${query2}: ` + d[query2])
        .style("top", e.pageY + 10 + "px")
        .style("left", e.pageX + 10 + "px");
    };

    const mouseleave = function (e, d) {
      tooltip.style("visibility", "hidden").transition().duration(200);
      d3.select(this)
        .attr("r", circleOriginalSize)
        .style("stroke", "none")
        .style("stroke-width", 2)
        .style("fill-opacity", 0.8);
    };

    this.data = this.data.filter((d, i) => i < 1000);
    const circles = this.svg.selectAll("circle").data(this.data);
    circles
      .enter()
      .append("circle")
      .merge(circles)
      .attr("r", circleOriginalSize)
      .attr("fill", "#8A8BD0")
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

    circles.exit().remove();
  }
}

export default Scatter;
