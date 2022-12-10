import { useState, useEffect, useMemo } from "react";
import Header from "../components/header";
import styles from "../styles/Home.module.css";
import ScatterWrapper from "../components/scatterWrapper";
import StructureWrapper from "../components/structureWrapper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { csv } from "d3";
import dynamic from "next/dynamic";
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/scatter"><a>Go to scatter page</a></Link>
    </>
  );
}





