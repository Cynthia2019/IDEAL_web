import React, { useRef, useState, useEffect } from "react";
import Scatter from "../charts/Scatter";

const ScatterWrapper = ({ data, element, setDataPoint, query1, query2 }) => {
  const chartArea = useRef(null);
  const legendArea = useRef(null)
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new Scatter(chartArea.current, legendArea.current, data, setDataPoint));
    } 
    else {
        chart.update(data, chartArea.current, legendArea.current, setDataPoint, query1, query2);

    }
  }, [chart, query1, query2, data]);

  return <div style={{display: 'flex', flexDirection: 'row'}}>
    <div id="main-plot" ref={chartArea}></div>
    <div id="main-plot-legend" style={{display:'flex', flexDirection:'column'}} ref={legendArea}></div>
  </div>
};

export default ScatterWrapper;
