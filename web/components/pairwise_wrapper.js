import React, {useRef, useState, useEffect} from "react";
import Pairwise_d3 from "./Pairwise_d3";

const Pairwise_wrapper = ({data, element, setDataPoint, query1, query2, setSelectedData }) => {
    const pairwiseContainer = useRef(null);
    const legendArea = useRef(null)
    const [chart, setChart] = useState(null);

    useEffect(() => {
        if (!chart) {
            setChart(new Pairwise_d3(data, pairwiseContainer));
        } else {
            chart.update(data, {columns: [
                    "C11",
                    "C12",
                    "C22",
                    "C16",
                    "C26",
                    "C66"
                ]}, pairwiseContainer);

        }
    }, [data]);

    return (
        <div id="pairwise-plot" ref={pairwiseContainer}></div>
    );
};
export default Pairwise_wrapper;
