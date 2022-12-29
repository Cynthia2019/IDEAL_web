import { useRef } from 'react'
import styles from "../styles/Home.module.css";
import SaveDataTable from "./saveDataTable";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";


const SavePanel = ({ selectedData }) => {
    const csvLink = useRef() 
    console.log('save panel', selectedData)
  const handleDownloadClick = () => {
    setTimeout(() => {
        csvLink.current.link.click();
    })
  }
  return (
    <div className={styles.saveSection}>
      <div className={styles["save-data-content-line"]}>
        <p className={styles["data-title"]}>Save Panel</p>
        <Button variant="contained" endIcon={<DownloadIcon />} onClick={handleDownloadClick}>
          Download
        </Button>
        <CSVLink data={selectedData} filename={"saved_data.csv"} ref={csvLink} target='_blank'></CSVLink>
      </div>
      <div className={styles["save-table-wrapper"]}>
        <SaveDataTable data={selectedData}/>
      </div>
    </div>
  );
};

export default SavePanel;
