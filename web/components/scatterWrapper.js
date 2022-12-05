import React, { useRef, useState, useEffect } from "react";
import Scatter from "../charts/Scatter";

const ScatterWrapper = ({ data, setDataPoint, query1, query2 }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new Scatter(chartArea.current, data, setDataPoint));
    } 
    else {
      chart.update(data, chartArea.current, setDataPoint, query1, query2);
    }
  }, [chart, query1, query2, data]);

  return <div id="main-plot" ref={chartArea}></div>
};

export default ScatterWrapper;
