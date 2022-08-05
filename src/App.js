import logo from "./logo.svg";
import "./App.css";
import { PrimaryMap } from "./components/PrimaryMap";
import { Soils, Watershed, Counties, Physio, Tax } from "./components/Outputs";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Container, Fab } from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useState, useEffect, useRef } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { SoilsType } from "./components/Outputs/SoilsType";

function App() {
  const itemRef = useRef(null);
  const [value, setValue] = React.useState(7);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (itemRef && itemRef.current) {
      window.scrollTo({
        top: itemRef.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  });

  return (
    <Container id="main">
      <AppBar>
        <Typography variant="h6" color="inherit" component="div">
          NuMan Technology Prototype Demo
        </Typography>
      </AppBar>
      <Stack spacing={2} alignItems="center">
        <Divider flexItem="true" />
        <div
          style={{
            position: "fixed",
            backgroundColor: "white",
            zIndex: "1",
            width: 1000,
          }}
        >
          <Tabs sx={{ mt: 1 }} value={value} onChange={handleChange} centered>
            <Tab label="Map" />
            <Tab label="Soils" />
            <Tab label="Watersheds" />
            <Tab label="County" />
            <Tab label="Physios" />
            <Tab label="Tax" />
          </Tabs>
        </div>
        <div ref={value === 0 ? itemRef : null}>
          <PrimaryMap />
        </div>
        <div ref={value === 1 ? itemRef : null}>
          <SoilsType />
        </div>
        <Divider flexItem="true" />
        <div ref={value === 2 ? itemRef : null}>
          <Watershed />
        </div>
        <Divider flexItem="true" />
        <div ref={value === 3 ? itemRef : null}>
          <Counties />
        </div>
        <Divider flexItem="true" />
        <div ref={value === 4 ? itemRef : null}>
          <Physio />
        </div>
        <Divider flexItem="true" />
        <div ref={value === 5 ? itemRef : null}>
          <Tax />
        </div>
      </Stack>
    </Container>
  );
}

export default App;
