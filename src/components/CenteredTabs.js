import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Soils, Watershed } from './Outputs';

export default function CenteredTabs() {
  const itemRef = useRef(null);
  const [value, setValue] = React.useState(0);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (itemRef && itemRef.current) {
      window.scrollTo({
        top: itemRef.current.offsetTop - 50,
        behavior: "smooth"
      });
    }
  });
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Soils" />
        <Tab label="Watersheds" />
        <Tab label="County" />
        <Tab label="Physios" /> 
      </Tabs>
      <div style={{ height: "1000px" ,alignItems: "center" }}>
        <div
          ref={value === 0 ? itemRef : null}
          style={{ height: "500px", backgroundColor: "pink" }}
        >
          <Soils />
        </div>
        <div
          ref={value === 1 ? itemRef : null}
          style={{ height: "500px", backgroundColor: "cyan" }}
        >
          <Watershed />
        </div>
      </div>
    </Box>
  );
}