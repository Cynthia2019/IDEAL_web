import { useEffect, useState } from "react";
import { Slider } from "antd";
import styles from "../styles/rangeSelector.module.css";

const merge = (first, second) => {
  for (let i = 0; i < second.length; i++) {
    for (let j = 0; j < second[i].data.length; j++) {
      first.push(second[i].data[j]);
    }
  }
  return first;
};

const rangeList = ["C11", "C12", "C22", "C16", "C26", "C66"];

const RangeSelector = ({ datasets, filteredDatasets, handleChange }) => {
  const data = merge([], datasets);
  const filtered = merge([], filteredDatasets)
  const handleSliderChange = (name, value) => {
    handleChange(name, value);
  };
  return (
    <div className={styles["property-range"]}>
      <p className={styles["range-title"]}>Property Range</p>
      {rangeList.map((name, index) => (
        <div className={styles["range-content-line"]}>
          <p>{name}</p>
          <Slider
            range={{ draggableTrack: true }}
            defaultValue={[
              Math.min(...data.map((d) => d[name])),
              Math.max(...data.map((d) => d[name])),
            ]}
            value={[Math.min(...filtered.map((d) => d[name])), Math.max(...filtered.map((d) => d[name]))]}
            min={Math.min(...data.map((d) => d[name]))}
            max={Math.max(...data.map((d) => d[name]))}
            onChange={(value, filteredDatasets) => handleSliderChange(name, value)}
          />
        </div>
      ))}

      {/* <div className={styles["range-content-line"]}>
            <p>C12</p>
            <Slider
            range={{draggableTrack: true}}
            defaultValue={[Math.min(...data.map(d => d['C12'])), Math.max(...data.map(d => d['C12']))]}
            min={Math.min(...data.map(d => d['C12']))}
            max={Math.max(...data.map(d => d['C12']))}
            onChange={(value) => handleChange("C12", value)}
            />
          </div> */}
    </div>
  );
};

export default RangeSelector;
