import { useState } from "react";
import styles from "../styles/dataSelector.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const datasetNames = ["free form 2D", "lattice 2D"];

const AxisSelections = [
  "C11",
  "C12",
  "C22",
  "C16",
  "C26",
  "C66",
  "Minimal directional Young's modulus [N/m]",
  "Maximal directional Young's modulus [N/m]",
  "Minimal Poisson's ratio [-]",
  "Maximal Poisson's ratio [-]",
];

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DataSelector = ({
  selectedDatasetNames,
  handleSelectedDatasetNameChange,
  query1,
  handleQuery1Change,
  query2,
  handleQuery2Change,
}) => {
  return (
    <div className={styles["data-selector"]}>
      <div className={styles["content-line"]}>
        <p className={styles["data-title"]}>Data</p>
        <FormControl sx={{ m: 1}}>
          <InputLabel htmlFor="dataset-select">
            Data
          </InputLabel>
          <Select
            id="dataset-select"
            labelId="dataset-select-label"
            multiple
            onChange={handleSelectedDatasetNameChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            value={selectedDatasetNames}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {datasetNames.map((name, i) => (
              <MenuItem value={name} key={`${name}-${i}`}>
                {name}
              </MenuItem>
            ))}
          </Select>
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
            {AxisSelections.map((item, index) => {
              return (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              );
            })}
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
            {AxisSelections.map((item, index) => {
              return (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default DataSelector;
