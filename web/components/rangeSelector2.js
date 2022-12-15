// import { useEffect, useState } from "react";
// import Slider, { SliderThumb } from "@mui/material/Slider";
// import Tooltip from '@mui/material/Tooltip';
// import { styled } from "@mui/material/styles";
// import PropTypes from "prop-types";
// import styles from "../styles/rangeSelector.module.css";

// const thumbDistance = 140000000;
// var delta = 0;

// const AirbnbSlider = styled(Slider)(({ theme }) => ({
//   color: "#3a8589",
//   height: 3,
//   padding: "13px 0",
//   pointerEvents: "all !important",
//   "& .MuiSlider-thumb": {
//     height: 27,
//     width: 27,
//     backgroundColor: "#fff",
//     border: "1px solid currentColor",
//     pointerEvents: "all !important",
//     "&:hover": {
//       boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
//     },
//     "& .airbnb-bar": {
//       height: 9,
//       width: 1,
//       backgroundColor: "currentColor",
//       marginLeft: 1,
//       marginRight: 1,
//     },
//   },
//   "& .MuiSlider-track": {
//     height: 10,
//     pointerEvents: "all !important"
//   },
//   "& .MuiSlider-rail": {
//     color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
//     opacity: theme.palette.mode === "dark" ? undefined : 1,
//     height: 3,
//   },
// }));

// function ValueLabelComponent(props) {
//   const { children, value } = props;

//   return (
//     <Tooltip enterTouchDelay={0} placement="top" title={value}>
//       {children}
//     </Tooltip>
//   );
// }

// ValueLabelComponent.propTypes = {
//   children: PropTypes.element.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function AirbnbThumbComponent(props) {
//   const { children, ...other } = props;
//   return (
//     <SliderThumb {...other}>
//       {" "}
//       {children} <span className="airbnb-bar" />
//       <span className="airbnb-bar" />
//       <span className="airbnb-bar" />
//     </SliderThumb>
//   );
// }

// AirbnbThumbComponent.propTypes = {
//   children: PropTypes.node,
// };

// const merge = (first, second) => {
//   for(let i=0; i<second.length; i++) {
//     for(let j = 0; j < second[i].data.length; j++) {
//       first.push(second[i].data[j]);
//     }
//   }
//   return first;
// }

// const checkOnThumb = (currValue, currThumbPos) => {
//   console.log(currValue, currThumbPos - thumbDistance / 2)
//   if((currValue >= currThumbPos - thumbDistance / 2) && (currValue <= currThumbPos + thumbDistance / 2)){
//     return true; 
//   }
//   return false;
// }

// const getDelta = (vals, newVals) => {
//   const d0 = newVals[0] - vals[0];
// 	const d1 = newVals[1] - vals[1];
// 	return d0 === 0 ? d1 : d0;
// }

// const RangeSelector = ({ datasets, handleRangeChange, handleFixedRangeChange }) => {
//   // const handleFixedRangeChange = (event, newValue, activeThumb) => {
//   //   let vals = newValue
//   //   const d = getDelta(C11range, newValue)
//   //   console.log(d)
//   //   vals = vals.map(v => v + d)
//   //   setC11Range(vals)
//   // }
//   var currPos = []
//   var newPos = []
//   var fixedRange = 0
//     const handleChange = (event, newValue, activeThumb) => {
//       let currValue = newValue[activeThumb]
//       let bar = event.target.name
//       console.log(currValue, event.target.value, C11range)
//       let currThumbPos
//       let currRangeValue
//       switch(bar) {
//         case "C11": 
//           currThumbPos = C11range[activeThumb]; 
//           currRangeValue = C11range
//           break; 
//         case "C12": 
//           currThumbPos = C12range[activeThumb]; 
//           currRangeValue = C12range
//           break; 
//         default: 
//           break; 
//       }
//       //on thumb
//       if(checkOnThumb(currValue, currThumbPos)) {
//         handleRangeChange(event, newValue, activeThumb) 
//         switch (bar) {
//           case "C11": 
//             setC11Range(newValue);
//             break;
//           case "C12": 
//             setC12Range(newValue); 
//             break;
//           default: 
//             break
//         }
//       } 
//       else {
//         handleFixedRangeChange(event, currRangeValue, newValue, activeThumb) 
//         let vals = newValue
//         if(event.type == 'mousedown') {
//           currPos = event.target.value
//           fixedRange = currRangeValue[1] -  currRangeValue[0]
//         }
//         if(event.type == 'mousemove') {
//           console.log("new Value: ", newValue)
//           newPos = event.target.value
//           let deltaLeft = currPos[0] - newPos[0] 
//           let deltaRight = currPos[1] - newPos[1]
//           if(deltaLeft === 0) {
//             let delta = deltaRight
//             vals[0] = currRangeValue[0] + delta
//             vals[1] = vals[0] + fixedRange
//           }
//           else if(deltaRight === 0) {
//             let delta = deltaLeft
//             vals[1] = currRangeValue[1] + delta
//             vals[0] = vals[1] - fixedRange
//           }
//           console.log("vals: ",vals)
//           switch (bar) {
//             case "C11": 
//               setC11Range(vals);
//               break;
//             case "C12": 
//               setC12Range(vals); 
//               break;
//             default: 
//               break
//           }
//         }
      
//       }
//     }
//     const data = merge([], datasets)
//     const [C11range, setC11Range] = useState([0, 1000000000])
//     const [C12range, setC12Range] = useState([0, 1000000000])
//     const [mouseDown, setMouseDown] = useState(false)
//     const [mouseMove, setMouseMove] = useState(false)

//     useEffect(() => {
//       const tracks = document.getElementsByClassName("MuiSlider-track");
//       const cleanups = [];
//       for(const track of tracks) {
//         const downListener = (e) => {
//           setMouseDown(true)
//         };
//         track.addEventListener("mousedown", downListener);
//         const moveListener = (e) => {
//           setMouseMove(true)
//         }
//         track.addEventListener("mousemove", moveListener)
//         const upListener = (e) => {
//           setMouseDown(false)
//           setMouseMove(false)
//         }
//         track.addEventListener("mouseup", upListener)
//         const cleanup = () => {
//           track.removeEventListener("mousedown", downListener);
//           track.removeEventListener("mousemove", moveListener);
//           track.removeEventListener("mouseup", upListener);
//         };
//         cleanups.push(cleanup);
//       }
//       return () => {
//         console.log("clean");
//         cleanups.forEach((cleanup) => cleanup());
//       };
//     }, [C11range, C12range])
//   return (
//     <div className={styles["property-range"]}>
//       <p className={styles["range-title"]}>Property Range</p>
//       <div className={styles["range-content-line"]}>
//         <p>C11</p>
//         <AirbnbSlider
//           valueLabelDisplay="auto"
//           slots={{ thumb: AirbnbThumbComponent, valueLabel: ValueLabelComponent, }}
//           getAriaLabel={() => "C11 Range Selector"}
//           defaultValue={[Math.min(...data.map(d => d['C11'])), Math.max(...data.map(d => d['C11']))]}
//           min={Math.min(...data.map(d => d['C11']))}
//           max={Math.max(...data.map(d => d['C11']))}
//           value={C11range}
//           name={"C11"}
//           onChange={handleChange}
//           disableSwap
//         />
//       </div>
//       <div className={styles["range-content-line"]}>
//         <p>C12</p>
//         <AirbnbSlider
//           valueLabelDisplay="auto"
//           slots={{ thumb: AirbnbThumbComponent, valueLabel: ValueLabelComponent, }}
//           getAriaLabel={() => "C12 Range Selector"}
//           defaultValue={[Math.min(...data.map(d => d['C12'])), Math.max(...data.map(d => d['C12']))]}
//           min={Math.min(...data.map(d => d['C12']))}
//           max={Math.max(...data.map(d => d['C12']))}
//           value={C12range}
//           name={"C12"}
//           onChange={handleChange}
//           disableSwap
//         />
//       </div>
//     </div>
//   );
// };

// export default RangeSelector;
