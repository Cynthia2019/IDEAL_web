import styles from "../styles/Home.module.css";
import { Row, Col } from "antd";

const infos = ['CM0','CM1']

const MaterialInformation = ({dataPoint}) => {
  return (
    <div className={styles.materialInformation}>
      <div className={styles["content-line"]}>
        <p className={styles["data-title"]}>Material Information</p>
      </div>
      {infos.map((info, index) => (
        <div key={index}>
        <div className={styles['mat-subtitle-line']}>
            <div style={{background: index ? 'black' : 'white', border: '1px solid black', width: '10px', height: '10px'}}></div>
            <h3 style={{margin: '0 10px'}}>Constituent Material {index} Properties</h3>
        </div>
        <div className={styles['mat-content-line']}></div>
        </div>
      ))}
    </div>
  );
};

export default MaterialInformation;
