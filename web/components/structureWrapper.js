import React, { useRef, useState, useEffect } from "react";
import Structure from "../charts/Structure";

const StructureWrapper = ({ data }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    
    if (!chart) {
      setChart(new Structure(chartArea.current, data));
    } 
    else {
      chart.update(data);
    }
  }, [chart, data]);

  return <div className="structure-plot" ref={chartArea}></div>
};

export default StructureWrapper;
