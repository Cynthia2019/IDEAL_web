import { useState } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import styles from "../styles/rangeSelector.module.css";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {" "}
      {children} <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const RangeSelector = ({ datasets }) => {
    const [range, setRange] = useState([0, 1000000000])
    const handleRangeChange = (event, newValue, activeThumb) => {
        setRange(newValue)
    }
    Array.prototype.push.apply(datasets)
    console.log(Math.min(...datasets.map(d => d['C11'])), Math.max(...datasets.map(d => d['C11'])))
  return (
    <div className={styles["property-range"]}>
      <p className={styles["range-title"]}>Property Range</p>
      <div className={styles["range-content-line"]}>
        <p>C11</p>
        <AirbnbSlider
          slots={{ thumb: AirbnbThumbComponent }}
          getAriaLabel={() => "C11 Range Selector"}
          defaultValue={[Math.min(...datasets.map(d => d['C11'])), Math.max(...datasets.map(d => d['C11']))]}
          value={range}
          onChange={handleRangeChange}
          disableSwap
        />
      </div>
    </div>
  );
};

export default RangeSelector;
