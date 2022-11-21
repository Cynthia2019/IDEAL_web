import { useState, useEffect } from "react";
import Header from "../components/header";
import styles from "../styles/Home.module.css";
import ChartWrapper from "../components/ChartWrapper";

export default function Home() {
  const [initialData, setInitialData] = useState([]);
  const [query1, setQuery1] = useState(
    "Minimal directional Young's modulus [N/m]"
  );
  const [query2, setQuery2] = useState(
    "Maximal directional Young's modulus [N/m]"
  );
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className={styles.mainPlot}>
          <div className={styles.mainPlotHeader}>
            <p className={styles.mainPlotTitle}>Material Data Explorer</p>
            <p className={styles.mainPlotSub}>
              Select properties from the dropdown menus below to graph on the x
              and y axes. Hovering over data points provides additional
              information. Scroll to zoom, click and drag to pan, and
              double-click to reset.
            </p>
          </div>
          <ChartWrapper
            data={initialData}
            setData={setInitialData}
            query1={query1}
            query2={query2}
          />
        </div>
        <div className={styles.selectors}></div>
      </div>
    </div>
  );
}
