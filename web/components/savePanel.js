import { useRef } from 'react'
import styles from "../styles/Home.module.css";
import SaveDataTable from "./saveDataTable";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { CSVLink } from "react-csv";


const SavePanel = ({ selectedData, setReset }) => {
    const csvLink = useRef() 
  const handleDownloadClick = () => {
    setTimeout(() => {
        csvLink.current.link.click();
    })
  }
  const handleResetClick = () => {
    setReset(true)
  }
  return (
    <div className={styles.saveSection}>
      <div className={styles["save-data-content-line"]}>
        <p className={styles["data-title"]}>Save Panel</p>
        <div className={styles["save-table-button-group"]}>
        <Button className={styles["save-table-button"]} variant="contained" endIcon={<DownloadIcon />} onClick={handleDownloadClick}>
          Download
        </Button>
        <Button className={styles["save-table-button"]} variant='contained' endIcon={<RestartAltIcon />} onClick={handleResetClick} color='error'></Button>
        <CSVLink data={selectedData} filename={"saved_data.csv"} ref={csvLink} target='_blank'></CSVLink>
        </div>
      </div>
      <div className={styles["save-table-wrapper"]}>
        <SaveDataTable data={selectedData}/>
      </div>
    </div>
  );
};

export default SavePanel;
