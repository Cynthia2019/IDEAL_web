import { useState, useEffect, useMemo } from "react";
import Plot from "react-plotly.js";
import * as d3 from 'd3';

export default function pairwise() {
    const [data, setData] = useState([]);
    const [layout, setLayout] = useState([]);
    useEffect(() => {
        d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/iris-data.csv').then((rows) => {

        function unpack(rows, key) {
            console.log(rows)
            return rows.map(row => row[key.replace('.', ' ')]);
        }

        const colors = unpack(rows, 'class').map(c => {
            if (c === 'Iris-setosa') {
                return 0;
            } else if (c === 'Iris-versicolor') {
                return 0.5;
            } else if (c === 'Iris-virginica') {
                return 1;
            }
        });

        const pl_colorscale = [
            [0.0, '#19d3f3'],
            [0.333, '#19d3f3'],
            [0.333, '#e763fa'],
            [0.666, '#e763fa'],
            [0.666, '#636efa'],
        ]

        var axis = () => ({
            showline: false,
            zeroline: false,
            gridcolor: '#ffff',
            ticklen: 4
        })

        var data = [{
            type: 'splom',
            dimensions: [
                {label: 'sepal length', values: unpack(rows, 'sepal length')},
                {label: 'sepal width', values: unpack(rows, 'sepal width')},
                {label: 'petal length', values: unpack(rows, 'petal length')},
                {label: 'petal width', values: unpack(rows, 'petal width')}
            ],
            text: unpack(rows, 'class'),
            marker: {
                color: colors,
                colorscale: pl_colorscale,
                size: 7,
                line: {
                    color: 'white',
                    width: 0.5
                }
            }
        }]

        var layout = {
            title: 'Iris Data set',
            height: 800,
            width: 800,
            autosize: false,
            hovermode: 'closest',
            dragmode: 'select',
            plot_bgcolor: 'rgba(240,240,240, 0.95)',
            xaxis: axis(),
            yaxis: axis(),
            xaxis2: axis(),
            xaxis3: axis(),
            xaxis4: axis(),
            yaxis2: axis(),
            yaxis3: axis(),
            yaxis4: axis()
        }
        setData(data);
        setLayout(layout);
            });
    }, []);

    return (
        <Plot
            data={data}
            layout={layout}
        />
    );
}