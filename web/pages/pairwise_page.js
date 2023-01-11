import {useState, useEffect, useMemo} from "react";
import Header from "../components/header";
import styles from "../styles/Home.module.css";
import ScatterWrapper from "../components/scatterWrapper";
import StructureWrapper from "../components/structureWrapper";
import {csv} from "d3";
import dynamic from "next/dynamic";
import Pairwise_DataSelector from "../components/pairwise_dataSelector";
import RangeSelector from "../components/rangeSelector";
import MaterialInformation from "../components/materialInfo";
import SavePanel from "../components/savePanel";
import {Row, Col} from "antd";
import Pairwise_wrapper from "../components/pairwise_wrapper";

const regex = /[-+]?[0-9]*\.?[0-9]+([eE]?[-+]?[0-9]+)/g;

export default function Scatter() {
    const [datasets, setDatasets] = useState([]);
    const [filteredDatasets, setFilteredDatasets] = useState([]);
    const [dataPoint, setDataPoint] = useState({});
    const [selectedDatasetNames, setSelectedDatasetNames] = useState([]);
    const [selectedData, setSelectedData] = useState([])

    const [query1, setQuery1] = useState("C11");
    const [query2, setQuery2] = useState("C12");

    const Youngs = dynamic(() => import("../components/youngs"), {
        ssr: false,
    });

    const Poisson = dynamic(() => import("../components/poisson"), {
        ssr: false,
    });

    const handleSelectedDatasetNameChange = (e) => {
        const {
            target: {value},
        } = e;
        setSelectedDatasetNames(value);
        let newDatasets = datasets.filter((d) => value.includes(d.name));
        setFilteredDatasets(newDatasets);
    };

    const handleQuery1Change = (e) => {
        setQuery1(e.target.value);
    };

    const handleQuery2Change = (e) => {
        setQuery2(e.target.value);
    };

    const handleRangeChange = (name, value) => {
        let filteredDatasets = datasets.map((set, i) => {
            let filtered = set.data.filter(
                (d) => d[name] >= value[0] && d[name] <= value[1]
            );
            return {name: set.name, data: filtered, color: set.color};
        });
        setFilteredDatasets(filteredDatasets);
    };

    const datasetLinks = [
        {
            name: "free form 2D",
            src: "https://gist.githubusercontent.com/Cynthia2019/837a01c52c4c17d7b31dbd8ad3045878/raw/703d9fcdefcf28a084709ad6a98f403303aba5bd/ideal_freeform_2d_sample.csv",
            color: "#8A8BD0",
        },
        {
            name: "lattice 2D",
            src: "https://gist.githubusercontent.com/Cynthia2019/d840d03813d9b0fc13956430b8c42886/raw/6c82615e1bcce639938a008cc4af212f771627da/ideal_lattice_2d.csv",
            color: "#FFB347",
        },
    ];
    useEffect(() => {
        datasetLinks.map((d, i) => {
            csv(d.src).then((data) => {
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
                        CM0: d.CM0,
                        CM1: d.CM1,
                        CM0_E: d.CM0_E,
                        CM0_nu: d.CM0_nu,
                        CM1_E: d.CM1_E,
                        CM1_nu: d.CM1_nu,
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
                setDatasets((datasets) => [
                    ...datasets,
                    {
                        name: d.name,
                        data: processedData,
                        color: d.color,
                    },
                ]);
                setFilteredDatasets((datasets) => [
                    ...datasets,
                    {
                        name: d.name,
                        data: processedData,
                        color: d.color,
                    },
                ]);
                setSelectedDatasetNames((datasets) => [...datasets, d.name]);
                setDataPoint(processedData[0]);
            });
        });
    }, []);

    return (
        <div>
            <Header/>
            <div className={styles.body}>
                <Row>
                    <div className={styles.mainPlot}>
                        <div className={styles.mainPlotHeader}>
                            <p className={styles.mainPlotTitle}>Material Data Explorer</p>
                            <p className={styles.mainPlotSub}>
                                Select properties from the dropdown menus below to graph on the
                                x and y axes. Hovering over data points provides additional
                                information. Scroll to zoom, click and drag to pan, and
                                double-click to reset.
                            </p>
                        </div>
                        <Pairwise_wrapper
                            data={filteredDatasets}
                            setDataPoint={setDataPoint}
                            query1={query1}
                            query2={query2}
                            setSelectedData={setSelectedData}
                        />
                    </div>
                    <div className={styles.subPlots}>
                        <StructureWrapper data={dataPoint}/>
                        <Youngs dataPoint={dataPoint}/>
                        <Poisson dataPoint={dataPoint}/>
                    </div>
                    <div className={styles.selectors}>
                        <Pairwise_DataSelector
                            selectedDatasetNames={selectedDatasetNames}
                            handleSelectedDatasetNameChange={handleSelectedDatasetNameChange}
                            query1={query1}
                            handleQuery1Change={handleQuery1Change}
                            query2={query2}
                            handleQuery2Change={handleQuery2Change}
                        />
                        <RangeSelector
                            datasets={datasets}
                            filteredDatasets={filteredDatasets}
                            handleChange={handleRangeChange}
                        />
                        <MaterialInformation dataPoint={dataPoint}/>

                    </div>
                </Row>
            </div>
        </div>
    );
}
