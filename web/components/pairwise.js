import {useState, useEffect, useMemo} from "react";
import Plot from "react-plotly.js";
import * as d3 from 'd3';

export default function pairwise() {
    const [data, setData] = useState([]);
    const [layout, setLayout] = useState([]);
     const [config, setConfig] = useState([]);
    useEffect(() => {
        d3.csv('https://gist.githubusercontent.com/GeorgeBian/2446dbbe5cc245fb39f1bff276f67c5c/raw/81be4e3c171b399bdcf794a9860061099a289253/lattice_2d.csv').then((rows) => {

            const labels = ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'];
            console.log(rows)

            function unpack(rows, key) {
                console.log(rows)
                return rows.map(row => row[key.replace('.', ' ')]);
                //return rows.map(row => row);
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
                    {label: 'C11', values: unpack(rows, 'C11')},
                    {label: 'C12', values: unpack(rows, 'C12')},
                    {label: 'C22', values: unpack(rows, 'C22')},
                    {label: 'C16', values: unpack(rows, 'C16')},
                    {label: 'C26', values: unpack(rows, 'C26')},
                    {label: 'C66', values: unpack(rows, 'C66')}
                ],
                text: (labels) => labels.map(x => x),
                marker: {
                    color: "#8A8BD0",
                    colorscale: pl_colorscale,
                    size: 7,
                    line: {
                        color: 'white',
                        width: 0.5
                    }
                }
            }]

            var layout = {
                title: 'Lattice Data set',
                height: 850,
                width: 850,
                autosize: false,
                hovermode: 'closest',
                dragmode: 'select',
                plot_bgcolor: 'rgba(240,240,240, 0.95)',
                xaxis: axis(),
                xaxis2: axis(),
                xaxis3: axis(),
                xaxis4: axis(),
                xaxis5: axis(),
                xaxis6: axis(),
                yaxis: axis(),
                yaxis2: axis(),
                yaxis3: axis(),
                yaxis4: axis(),
                yaxis5: axis(),
                yaxis6: axis()
            }

            var config={
                scrollZoom: true,
                responsive: true
            }
            setConfig(config);
            setData(data);
            setLayout(layout);
        });
    }, []);
    return (
        <Plot
            data={data}
            layout={layout}
            config={config}
        />
    );
}