import styles from "../styles/Home.module.css";


const MaterialInformation = ({dataPoint}) => {
  return (
    <div className={styles.materialInformation}>
      <div className={styles["content-line"]}>
        <p className={styles["data-title"]}>Material Information</p>
      </div>
      <div className={styles["mat-content"]}>
        <div className={styles['mat-subtitle-line']}>
            <div style={{background: 'white', border: '1px solid black', width: '10px', height: '10px'}}></div>
            <h3 style={{margin: '0 10px'}}>Constituent Material 0 Properties</h3>
        </div>
        <div className={styles['mat-content-line']}>Type: {dataPoint.CM0}</div>
        <div className={styles['mat-content-line']}>Young's Modulus: {dataPoint.CM0_E}</div>
        <div className={styles['mat-content-line']}>Poisson's Ratio: {dataPoint.CM0_nu}</div>
        </div>
        <div className={styles["mat-content"]}>
        <div className={styles['mat-subtitle-line']}>
            <div style={{background: 'black', border: '1px solid black', width: '10px', height: '10px'}}></div>
            <h3 style={{margin: '0 10px'}}>Constituent Material 1 Properties</h3>
        </div>
        <div className={styles['mat-content-line']}>Type: {dataPoint.CM1}</div>
        <div className={styles['mat-content-line']}>Young's Modulus: {dataPoint.CM1_E}</div>
        <div className={styles['mat-content-line']}>Poisson's Ratio: {dataPoint.CM1_nu}</div>
        </div>
    </div>
  );
};

export default MaterialInformation;
