import styles from "../styles/Home.module.css";
import SaveDataTable from "./saveDataTable";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

const SavePanel = ({ dataPoints }) => {
  return (
    <div className={styles.saveSection}>
      <div className={styles["save-data-content-line"]}>
        <p className={styles["data-title"]}>Save Panel</p>
        <Button variant="contained" endIcon={<DownloadIcon />}>
          Download
        </Button>
      </div>
      <div className={styles["save-table-wrapper"]}>
        <SaveDataTable />
      </div>
    </div>
  );
};

export default SavePanel;
