import { useState, useEffect, useMemo } from "react";
import Header from "../components/header";
import styles from "../styles/Home.module.css";
import ScatterWrapper from "../components/scatterWrapper";
import StructureWrapper from "../components/structureWrapper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { csv } from "d3";
import dynamic from "next/dynamic";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const regex = /[-+]?[0-9]*\.?[0-9]+([eE]?[-+]?[0-9]+)/g;

export default function Home() {
  const [initialData, setInitialData] = useState([]);
  const [dataPoint, setDataPoint] = useState({});

  const [query1, setQuery1] = useState(
    "Minimal directional Young's modulus [N/m]"
  );
  const [query2, setQuery2] = useState(
    "Maximal directional Young's modulus [N/m]"
  );
  const [dataset, setDataset] = useState("");

  const Youngs = dynamic(() => import("../components/youngs"), {
    ssr: false,
  });

  const Poisson = dynamic(() => import("../components/poisson"), {
    ssr: false,
  });

  const handleDatasetChange = (e) => {
    setDataset(e.target.value);
  };

  const handleQuery1Change = (e) => {
    setQuery1(e.target.value);
  };

  const handleQuery2Change = (e) => {
    setQuery2(e.target.value);
  };

  useEffect(() => {
    csv(
      "https://gist.githubusercontent.com/Cynthia2019/837a01c52c4c17d7b31dbd8ad3045878/raw/57fc554bfb9f5df3c92d3309147b4c6c0b1190ca/ideal_2d_data_small_sample.csv"
    ).then((data) => {
      const processedData = data.map((d) => {
        let youngs = d.youngs.match(regex).map(parseFloat);
        let poisson = d.poisson.match(regex).map(parseFloat);
        let processed = {
          C11: parseFloat(d.C11),
          C12: parseFloat(d.C12),
          C22: parseFloat(d.C22),
          C16: parseFloat(d.C16),
          C26: parseFloat(d.C26),
          C66: parseFloat(d.C66),
          condition: d.condition,
          symmetry: d.symmetry,
          material_0: d.CM0,
          material_1: d.CM1,
          geometry: d.geometry_full,
          youngs: youngs,
          poisson: poisson,
          "Minimal directional Young's modulus [N/m]": Math.min(...youngs),
          "Maximal directional Young's modulus [N/m]": Math.max(...youngs),
          "Minimal Poisson's ratio [-]": Math.min(...poisson),
          "Maximal Poisson's ratio [-]": Math.max(...poisson),
        };
        return processed;
      });
      setInitialData(processedData);
      setDataPoint(processedData[0]);
    });
  }, []);

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
          <ScatterWrapper
            data={initialData}
            setDataPoint={setDataPoint}
            query1={query1}
            query2={query2}
          />
        </div>
        <div className={styles.subPlots}>
          <StructureWrapper data={dataPoint} />
          <Youngs dataPoint={dataPoint} />
          <Poisson dataPoint={dataPoint} />
        </div>
        <div className={styles.selectors}>
          <div className={styles["data-selector"]}>
            <div className={styles["data-content-line"]}>
              <p className={styles["data-title"]}>Data</p>
              <FormControl>
                <InputLabel htmlFor="dataset-select-label" variant="standard">
                  Northwestern Free-Form Metamaterial Dataset
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "dataset",
                    id: "dataset-select-label",
                  }}
                  value={dataset}
                  label="Dataset"
                  onChange={handleDatasetChange}
                >
                  <option value={"Northwestern Free-Form Metamaterial Dataset"}>
                    Northwestern Free-Form Metamaterial Dataset
                  </option>
                </NativeSelect>
              </FormControl>
            </div>
            <div className={styles["data-content-line"]}>
              <p>x-axis data</p>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="x-axis-select-label">{query1}</InputLabel>
                <Select
                  labelId="x-axis-select-label"
                  id="x-axis-select"
                  value={query1}
                  onChange={handleQuery1Change}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={"Minimal directional Young's modulus [N/m]"}>
                    Minimal directional Young's modulus [N/m]
                  </MenuItem>
                  <MenuItem value={"Maximal directional Young's modulus [N/m]"}>
                    Maximal directional Young's modulus [N/m]
                  </MenuItem>
                  <MenuItem value={"Minimal Poisson's ratio [-]"}>
                    Minimal Poisson's ratio [-]
                  </MenuItem>
                  <MenuItem value={"Maximal Poisson's ratio [-]"}>
                    Maximal Poisson's ratio [-]
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={styles["data-content-line"]}>
              <p>y-axis data</p>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="y-axis-select-label">{query2}</InputLabel>
                <Select
                  labelId="y-axis-select-label"
                  id="y-axis-select"
                  value={query2}
                  onChange={handleQuery2Change}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={"Minimal directional Young's modulus [N/m]"}>
                    Minimal directional Young's modulus [N/m]
                  </MenuItem>
                  <MenuItem value={"Maximal directional Young's modulus [N/m]"}>
                    Maximal directional Young's modulus [N/m]
                  </MenuItem>
                  <MenuItem value={"Minimal Poisson's ratio [-]"}>
                    Minimal Poisson's ratio [-]
                  </MenuItem>
                  <MenuItem value={"Maximal Poisson's ratio [-]"}>
                    Maximal Poisson's ratio [-]
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles["property-range"]}>
            <p className={styles["range-title"]}>Property Range</p>
            <div className={styles["range-content-line"]}>
              <p>x-axis: {query1}</p>
              <div className={styles["range-selection-line"]}>
                <TextField
                  id="range-selector-1"
                  label="Min"
                  type="number"
                  variant="standard"
                  sx={{width: "40%"}}
                />
                <TextField
                  id="range-selector-2"
                  label="Max"
                  type="number"
                  variant="standard"
                  sx={{width: "40%"}}
                />
              </div>
            </div>
            <div className={styles["range-content-line"]}>
              <p>y-axis: {query2}</p>
              <div className={styles["range-selection-line"]}>
                <TextField
                  id="range-selector-3"
                  label="Min"
                  type="number"
                  variant="standard"
                  sx={{width: "40%"}}
                />
                <TextField
                  id="range-selector-4"
                  label="Max"
                  type="number"
                  variant="standard"
                  sx={{width: "40%"}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
