import React, { useRef, useState, useEffect } from "react";
import Scatter from "../charts/Scatter";

const ChartWrapper = ({ data, setData, query1, query2 }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new Scatter(chartArea.current, data));
    } 
    else {
      chart.update(data, setData, query1, query2);
    }
  }, []);

  return <div className="chart-area" ref={chartArea}></div>
};

export default ChartWrapper;
