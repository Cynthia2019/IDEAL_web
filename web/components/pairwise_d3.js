import * as d3 from "d3";

class Pairwise_d3 {
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/splom
    constructor(data, container, legendContainer) {
        this.container = container;
        // Compute values (and promote column names to accessors)
        this.legend = d3
            .select(legendContainer)
            .append("svg")
            .attr("width", 120)
            .append("g")
            .attr("class", "pairwise-plot-legend");

        this.render(data,
            {
                columns: [
                    "C11",
                    "C12",
                    "C22",
                    "C16",
                    "C26",
                    "C66"
                ],
                // z: d => d.species
                colors: data.color
            }, container);
    }

    render(data, {
        columns = data.columns, // array of column names, or accessor functions
        x = columns, // array of x-accessors
        y = columns, // array of y-accessors
        z = () => 1, // given d in data, returns the (categorical) z-value
        padding = 20, // separation between adjacent cells, in pixels
        marginTop = 10, // top margin, in pixels
        marginRight = 20, // right margin, in pixels
        marginBottom = 30, // bottom margin, in pixels
        marginLeft = 40, // left margin, in pixels
        width = 928, // outer width, in pixels
        height = width, // outer height, in pixels
        xType = d3.scaleLinear, // the x-scale type
        yType = d3.scaleLinear, // the y-scale type
        zDomain, // array of z-values
        fillOpacity = 0.7, // opacity of the dots
        colors = d3.schemeCategory10, // array of colors for z
    } = {}, container) {

        let datasets = [];

        data.map((d, i) => {
            for (let data of d.data) {
                data.name = d.name;
                data.color = d.color;
            }
            datasets.push(d.data);
        });

        let finalData = [].concat(...datasets);
        // Compute values (and promote column names to accessors).
        const X = d3.map(x, x => d3.map(finalData, typeof x === "function" ? x : d => +d[x]));
        const Y = d3.map(y, y => d3.map(finalData, typeof y === "function" ? y : d => +d[y]));
        const Z = d3.map(finalData, z);

        // Compute default z-domain, and unique the z-domain.
        if (zDomain === undefined) zDomain = Z;
        zDomain = new d3.InternSet(zDomain);

        // Omit any data not present in the z-domain.
        const I = d3.range(Z.length).filter(i => zDomain.has(Z[i]));

        // Compute the inner dimensions of the cells.
        const cellWidth = (width - marginLeft - marginRight - (X.length - 1) * padding) / X.length;
        const cellHeight = (height - marginTop - marginBottom - (Y.length - 1) * padding) / Y.length;

        // Construct scales and axes.
        const xScales = X.map(X => xType(d3.extent(X), [0, cellWidth]));
        const yScales = Y.map(Y => yType(d3.extent(Y), [cellHeight, 0]));
        const zScale = d3.scaleOrdinal(zDomain, colors);
        const xAxis = d3.axisBottom().ticks(cellWidth / 50);
        const yAxis = d3.axisLeft().ticks(cellHeight / 35);

        const svg = d3
            .select(container.current)
            .append('svg')
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-marginLeft, -marginTop, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        svg.append("g")
            .selectAll("g")
            .data(yScales)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * (cellHeight + padding)})`)
            .each(function (yScale) {
                return d3.select(this).call(yAxis.scale(yScale));
            })
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1));

        svg.append("g")
            .selectAll("g")
            .data(xScales)
            .join("g")
            .attr("transform", (d, i) => `translate(${i * (cellWidth + padding)}, ${height - marginBottom - marginTop})`)
            .each(function (xScale) {
                return d3.select(this).call(xAxis.scale(xScale));
            })
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("y2", -height + marginTop + marginBottom)
                .attr("stroke-opacity", 0.1))

        this.cell = svg.append("g")
            .selectAll("g")
            .data(d3.cross(d3.range(X.length), d3.range(Y.length)))
            .join("g")
            .attr("fill-opacity", fillOpacity)
            .attr("transform", ([i, j]) => `translate(${i * (cellWidth + padding)},${j * (cellHeight + padding)})`);

        this.cell.append("rect")
            .attr("fill", "none")
            .attr("stroke", "currentColor")
            .attr("width", cellWidth)
            .attr("height", cellHeight);

        if (x === y) svg.append("g")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .attr("font-weight", "bold")
            .selectAll("text")
            .data(x)
            .join("text")
            .attr("transform", (d, i) => `translate(${i * (cellWidth + padding)},${i * (cellHeight + padding)})`)
            .attr("x", padding / 2)
            .attr("y", padding / 2)
            .attr("dy", ".71em")
            .text(d => d);

    }

    update(data, {
               columns = data.columns, // array of column names, or accessor functions
               x = columns, // array of x-accessors
               y = columns, // array of y-accessors
               z = () => 1, // given d in data, returns the (categorical) z-value
               padding = 20, // separation between adjacent cells, in pixels
               marginTop = 10, // top margin, in pixels
               marginRight = 20, // right margin, in pixels
               marginBottom = 30, // bottom margin, in pixels
               marginLeft = 40, // left margin, in pixels
               width = 928, // outer width, in pixels
               height = width, // outer height, in pixels
               xType = d3.scaleLinear, // the x-scale type
               yType = d3.scaleLinear, // the y-scale type
               zDomain, // array of z-values
               fillOpacity = 0.7, // opacity of the dots
               colors = ["#FFB347", "#8A8BD0"], // array of colors for z
           } = {}, container,
           legendContainer,
           setDataPoint) {
        console.log("updating...");
        const circleFocusSize = 7;
        const circleSize = 3.5;
        const legendCircleSize = 5.0;
        const legendSpacing = 4;
        let datasets = [[], []];

        data.map((d, i) => {
            for (let data of d.data) {
                data.name = d.name;
                data.color = d.color;
            }
            datasets[i] = (d.data) ? (d.data) : [];
        });
        let finalData = [].concat(...datasets);

        let mouseover = function (e, d) {
            d3.select(this)
                .attr("r", circleFocusSize)
                .style("stroke", "black")
                .style("stroke-width", 2)
                .style("fill-opacity", 1);
            setDataPoint(finalData[d]);
        };

        let mouseleave = function (e, d) {
            d3.select(this)
                .attr("r", circleSize)
                .style("stroke", "none")
                .style("stroke-width", 2)
                .style("fill-opacity", 0.8);
        };

        d3.select(legendContainer).selectAll(".legend").remove();


        let legend = this.legend.selectAll(".legend").data(data);

        legend.exit().remove();

        legend
            .enter()
            .append("circle")
            .attr("class", "legend")
            .attr("r", legendCircleSize)
            .attr("cx", 10)
            .attr("cy", (d, i) => (legendCircleSize * 2 + legendSpacing * 2) * i + 30)
            .style("fill", (d) => d.color);
        //Create legend labels
        legend
            .enter()
            .append("text")
            .attr("class", "legend")
            .attr("x", 20)
            .attr("y", (d, i) => (legendCircleSize * 2 + legendSpacing * 2) * i + 30)
            .text((d) => d.name)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

        legend.exit().remove();

        // Compute values (and promote column names to accessors).
        const X = d3.map(x, x => d3.map(finalData, typeof x === "function" ? x : d => +d[x]));
        const Y = d3.map(y, y => d3.map(finalData, typeof y === "function" ? y : d => +d[y]));
        const Z = d3.map(finalData, z);

        // Compute default z-domain, and unique the z-domain.
        if (zDomain === undefined) zDomain = Z;
        zDomain = new d3.InternSet(zDomain);

        // Omit any data not present in the z-domain.
        const I = d3.range(Z.length).filter(i => zDomain.has(Z[i]));

        // Compute the inner dimensions of the cells.
        const cellWidth = (width - marginLeft - marginRight - (X.length - 1) * padding) / X.length;
        const cellHeight = (height - marginTop - marginBottom - (Y.length - 1) * padding) / Y.length;

        // Construct scales and axes.
        const xScales = X.map(X => xType(d3.extent(X), [0, cellWidth]));
        const yScales = Y.map(Y => yType(d3.extent(Y), [cellHeight, 0]));
        const zScale = d3.scaleOrdinal(zDomain, colors);
        const xAxis = d3.axisBottom().ticks(cellWidth / 50);
        const yAxis = d3.axisLeft().ticks(cellHeight / 35);

        this.cell.each(function ([x, y]) {
            if (x != y) {

                d3.select(this).selectAll("circle")
                    //.data(finalData)
                    .data(I.filter(i => !isNaN(X[x][i]) && !isNaN(Y[y][i])))
                    .join("circle")
                    .attr("r", circleSize)
                    .attr("cx", i => xScales[x](X[x][i]))
                    .attr("cy", i => yScales[y](Y[y][i]))
                    .attr("fill", (i) => finalData[i].color)
                    .on("mouseover", mouseover)
                    .on("mouseleave", mouseleave)

            } else {
                for (let i = 0; i < 2; i++) {
                    let a = columns;
                    let b = columns;
                    let X0 = d3.map(a, a => d3.map(datasets[i], typeof a === "function" ? a : d => +d[a]));
                    let Y0 = d3.map(b, b => d3.map(datasets[i], typeof b === "function" ? b : d => +d[b]));
                    const Z = d3.map(datasets[i], z);

                    // Omit any data not present in the z-domain.
                    let I0 = d3.range(Z.length).filter(i => zDomain.has(Z[i]));
                    const thresholds = 40
                    Y0 = d3.map(Y0[y], () => 1);
                    const bins = d3.bin().thresholds(thresholds).value(i => X0[x][i])(I0);
                    const Y1 = Array.from(bins, I0 => d3.sum(I0, i => Y0[i]));
                    const normalize = true;
                    // if (normalize) {
                    //     const total = d3.sum(Y1);
                    //     for (let i = 0; i < Y1.length; ++i) Y1[i] /= total;
                    // }

                    // Compute default domains.
                    const xDomain = [bins[0].x0, bins[bins.length - 1].x1];
                    const yDomain = [0, d3.max(Y1)];

                    // Construct scales and axes.
                    const xRange = [0, cellWidth];
                    const yRange = [cellHeight, 0];
                    const xScale = xType(xDomain, xRange);
                    const yScale = yType(yDomain, yRange);

                    const insetLeft = 0.5;
                    const insetRight = 0.5;

                    //when two dataset are selected, shows one color, but shows none when 1 or none are selected

                    if (datasets[i].length == 0) {
                        d3.selectAll(".group" + i)
                            .remove()
                        // } else if (dafinalData.length < 260) {
                        //     console.log("range slider change")
                        //     console.log(finalData.length) }
                    } else {
                        let histogram = d3.select(this)
                            .append("g")
                            .attr("class", "group" + i)
                        histogram
                            .selectAll("rect")
                            .data(bins)
                            .join("rect")
                            .attr("fill", colors[i])
                            .attr("x", d => xScale(d.x0) + insetLeft)
                            .attr("width", d => (bins.length == 1) ? 5 : Math.max(0, xScale(d.x1) - xScale(d.x0) - insetLeft - insetRight))
                            .attr("y", (d, i) => yScale(Y1[i]))
                            .attr("height", (d, i) => yScale(0) - yScale(Y1[i]))
                        histogram.exit().remove();
                    }

                }

            }
        })
        ;

    }

}


export default Pairwise_d3;