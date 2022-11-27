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
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { csv } from "d3";

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

export default function Home() {
  const [initialData, setInitialData] = useState([]);
  const [geometry, setGeometry] = useState('')

  const [query1, setQuery1] = useState("C11");
  const [query2, setQuery2] = useState("C12");
  const [dataset, setDataset] = useState("");

  const handleDatasetChange = (e) => {
    setDataset(e.target.value);
  };

  useEffect(() => {
    csv(
      "https://gist.githubusercontent.com/Cynthia2019/94aadbe0146bcdcc737534d1a6fbb925/raw/bb96d3bc0daeefa1005dd1671b700a4fdd8c99e4/ideal_2d_data.csv"
    ).then((data) => {
      const processedData = data.map((d) => ({
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
            geometry: d.geometry_full
          }));
      setInitialData(processedData);
    });
  }, [initialData]);

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
            query1={query1}
            query2={query2}
          />
          <div className={styles.subPlots}>
            <StructureWrapper data={initialData}/>
          </div>
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
                <InputLabel id="x-axis-select-label">C11</InputLabel>
                <Select
                  labelId="x-axis-select-label"
                  id="x-axis-select"
                  value="C11"
                  onChange={setQuery1}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={"C11"}>C11</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={styles["data-content-line"]}>
              <p>y-axis data</p>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="y-axis-select-label">C12</InputLabel>
                <Select
                  labelId="y-axis-select-label"
                  id="y-axis-select"
                  value="C12"
                  onChange={setQuery2}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={"C12"}>C12</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles["property-range"]}></div>
        </div>
      </div>
    </div>
  );
}
