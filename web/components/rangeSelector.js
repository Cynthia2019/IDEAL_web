import { useEffect, useState } from "react";
import { Slider, Row, Col } from "antd";
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
  const filtered = merge([], filteredDatasets);
  const handleSliderChange = (name, value) => {
    handleChange(name, value);
  };
  return (
    <div className={styles["property-range"]}>
      <p className={styles["range-title"]}>Property Range</p>
      {rangeList.map((name, index) => (
        <Row key={index} justify="center" align='top'>
          <Col span={4}>{name}</Col>
          <Col span={20}>
            <Slider
              range={{ draggableTrack: true }}
              defaultValue={[
                Math.min(...data.map((d) => d[name])),
                Math.max(...data.map((d) => d[name])),
              ]}
              value={[
                Math.min(...filtered.map((d) => d[name])),
                Math.max(...filtered.map((d) => d[name])),
              ]}
              min={Math.min(...data.map((d) => d[name]))}
              max={Math.max(...data.map((d) => d[name]))}
              onChange={(value, filteredDatasets) =>
                handleSliderChange(name, value)
              }
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default RangeSelector;
