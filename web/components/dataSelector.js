import styles from "../styles/dataSelector.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

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
    "Maximal Poisson's ratio [-]"
]

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

const DataSelector = ({
    dataset,
  handleDatasetChange,
  query1,
  handleQuery1Change,
  query2,
  handleQuery2Change,
}) => {
  return (
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
            {AxisSelections.map((item, index) => {
                return(
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                )
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
                return(
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                )
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default DataSelector;
