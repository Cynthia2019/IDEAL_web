import zIndex from "@mui/material/styles/zIndex";
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

  return <div id="structure-plot" ref={chartArea} style={{zIndex:10}}></div>
};

export default StructureWrapper;
