import React, { useRef, useState, useEffect } from "react";
import Scatter from "../charts/Scatter";

const ScatterWrapper = ({ data, dataPoint, setDataPoint, query1, query2 }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    console.log("render scatter", data)
    if (!chart) {
      setChart(new Scatter(chartArea.current, data, dataPoint, setDataPoint));
    } 
    else {
      chart.update(data, dataPoint, setDataPoint, query1, query2);
    }
  }, [chart, query1, query2, data, dataPoint]);

  return <div id="main-plot" ref={chartArea}></div>
};

export default ScatterWrapper;
