import { getBottomNavigationUtilityClass } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  height: 500,
}));

export const Soils = () => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: "NuMan_SoilTable" }} />
      </GridToolbarContainer>
    );
  }

  const state = useSelector((state) => state);
  let [fields, setFields] = useState(null);

  const columns = [
    {
      field: "superkey",
      headerName: "Soil Type ",
      width: 500,
    },
    {
      field: "area",
      headerName: "Area sq. m.",
    },
    {
      field: "pct",
      headerName: "Percent",
      width: 75,
    },
  ];

  useEffect(() => {
    if (state.results) {
      let results = state.results;

      let resultKeys = Object.keys(results);
      let lastKey = resultKeys[resultKeys.length - 1];

      let fields = results[lastKey];

      let fieldList = [];

      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          let fieldID = key;
          let soilList = [];
          let fieldSoils = element["soils"];
          if (fieldSoils) {
            fieldSoils.forEach((soil, index) => {
              soilList.push({
                id: index,
                superkey: soil["superkey"],
                area: soil["area"],
                pct: soil["pct"],
              });
            });
            console.log(soilList);
            fieldList.push({ id: fieldID, soils: soilList });
          }
        }
      }

      setFields(fieldList);
    }
  }, [state]);

  return (
    <Box sx={{ height: 500, width: 750, m: 5, overflow: "auto" }}>
      {fields ? (
        <Box sx={{ height: "100%" }}>
          <Typography variant="h3" gutterBottom component="div" align="center">
            Soils
          </Typography>

          {fields.map((field) => (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" gutterBottom component="div">
                    Field: #{field.id}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DataGrid
                    sx={{ height: "75%" }}
                    key={field.id}
                    columns={columns}
                    rows={field.soils}
                    components={{ Toolbar: CustomToolbar }}
                  />
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export const Watershed = () => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: "NuMan_WatershedTable" }} />
      </GridToolbarContainer>
    );
  }
  const state = useSelector((state) => state);
  let [fields, setFields] = useState(null);

  const columns = [
    {
      field: "superkey",
      headerName: "Watershed ID",
      width: 400,
    },
    {
      field: "area",
      headerName: "Area sq. m.",
    },
    {
      field: "pct",
      headerName: "Percent",
    },
  ];

  useEffect(() => {
    if (state.results) {
      let results = state.results;

      let resultKeys = Object.keys(results);
      let lastKey = resultKeys[resultKeys.length - 1];

      let fields = results[lastKey];
      console.log(fields);
      let fieldList = [];

      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          let fieldID = key;
          let watershedsList = [];
          let fieldWaters = element["watersheds"];
          if (fieldWaters) {
            fieldWaters.forEach((waters, index) => {
              watershedsList.push({
                id: index,
                superkey: waters["superkey"],
                area: waters["area"],
                pct: waters["pct"],
              });
            });
            fieldList.push({ id: fieldID, watersheds: watershedsList });
          }
        }
      }

      setFields(fieldList);
      console.log(fieldList);
    }
  }, [state]);

  return (
    <Box sx={{ height: 500, width: 750, overflow: "auto" }}>
      {fields ? (
        <Box sx={{ height: "100%" }}>
          <Typography variant="h3" gutterBottom component="div" align="center">
            Watersheds
          </Typography>

          {fields.map((field) => (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" gutterBottom component="div">
                    Field: #{field.id}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DataGrid
                    sx={{ height: "75%" }}
                    key={field.id}
                    columns={columns}
                    rows={field.watersheds}
                    components={{ Toolbar: CustomToolbar }}
                  />
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export const Counties = () => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: "NuMan_CountyTable" }} />
      </GridToolbarContainer>
    );
  }

  const state = useSelector((state) => state);
  let [fields, setFields] = useState(null);

  const columns = [
    {
      field: "superkey",
      headerName: "County",
      width: 400,
    },
    {
      field: "area",
      headerName: "Area sq. m.",
    },
    {
      field: "pct",
      headerName: "Percent",
    },
  ];

  useEffect(() => {
    if (state.results) {
      let results = state.results;

      let resultKeys = Object.keys(results);
      let lastKey = resultKeys[resultKeys.length - 1];

      let fields = results[lastKey];
      console.log(fields);
      let fieldList = [];

      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          let fieldID = key;
          let countiesList = [];
          let fieldCounties = element["counties"];
          if (fieldCounties) {
            fieldCounties.forEach((county, index) => {
              countiesList.push({
                id: index,
                superkey: county["superkey"],
                area: county["area"],
                pct: county["pct"],
              });
            });
            fieldList.push({ id: fieldID, counties: countiesList });
          }
        }
      }

      setFields(fieldList);
      console.log(fieldList);
    }
  }, [state]);

  return (
    <Box sx={{ height: 500, width: 750, overflow: "auto" }}>
      {fields ? (
        <Box sx={{ height: "100%" }}>
          <Typography variant="h3" gutterBottom component="div" align="center">
            County
          </Typography>

          {fields.map((field) => (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" gutterBottom component="div">
                    Field: #{field.id}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DataGrid
                    sx={{ height: "75%" }}
                    key={field.id}
                    columns={columns}
                    rows={field.counties}
                    components={{ Toolbar: CustomToolbar }}
                  />
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export const Physio = () => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: "NuMan_PhysiosTable" }} />
      </GridToolbarContainer>
    );
  }

  const state = useSelector((state) => state);
  let [fields, setFields] = useState(null);

  const columns = [
    {
      field: "superkey",
      headerName: "Region",
      width: 400,
    },
    {
      field: "area",
      headerName: "Area",
    },
    {
      field: "pct",
      headerName: "Percent",
    },
  ];

  useEffect(() => {
    if (state.results) {
      let results = state.results;

      let resultKeys = Object.keys(results);
      let lastKey = resultKeys[resultKeys.length - 1];

      let fields = results[lastKey];
      console.log(fields);
      let fieldList = [];

      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          let fieldID = key;
          let physiosList = [];
          let fieldPhysios = element["physios"];
          if (fieldPhysios) {
            fieldPhysios.forEach((physio, index) => {
              physiosList.push({
                id: index,
                superkey: physio["superkey"],
                area: physio["area"],
                pct: physio["pct"],
              });
            });
            fieldList.push({ id: fieldID, physios: physiosList });
          }
        }
      }

      setFields(fieldList);
      console.log(fieldList);
    }
  }, [state]);

  return (
    <Box sx={{ height: 500, width: 750, overflow: "auto" }}>
      {fields ? (
        <Box sx={{ height: "100%" }}>
          <Typography variant="h3" gutterBottom component="div" align="center">
            Physiographic Region
          </Typography>

          {fields.map((field) => (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" gutterBottom component="div">
                    Field: #{field.id}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DataGrid
                    sx={{ height: "75%" }}
                    key={field.id}
                    columns={columns}
                    rows={field.physios}
                    components={{ Toolbar: CustomToolbar }}
                  />
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export const Tax = () => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: "NuMan_TaxTable" }} />
      </GridToolbarContainer>
    );
  }

  const state = useSelector((state) => state);
  let [fields, setFields] = useState(null);

  const columns = [
    {
      field: "superkey",
      headerName: "Tax Lot",
      width: 500,
    },
    {
      field: "area",
      headerName: "Area sq. m.",
    },
    {
      field: "pct",
      headerName: "Percent",
    },
  ];

  useEffect(() => {
    if (state.results) {
      let results = state.results;

      let resultKeys = Object.keys(results);
      let lastKey = resultKeys[resultKeys.length - 1];

      let fields = results[lastKey];
      console.log(fields);
      let fieldList = [];

      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          let fieldID = key;
          let taxList = [];
          let fieldTaxes = element["tax_lots"];
          if (fieldTaxes) {
            fieldTaxes.forEach((soil, index) => {
              taxList.push({
                id: index,
                superkey: soil["superkey"],
                area: soil["area"],
                pct: soil["pct"],
              });
            });
            fieldList.push({ id: fieldID, taxes: taxList });
          }
        }
      }

      setFields(fieldList);
      console.log(fieldList);
    }
  }, [state]);

  return (
    <Box sx={{ height: 500, width: 750, overflow: "auto" }}>
      {fields ? (
        <Box sx={{ height: "100%" }}>
          <Typography variant="h3" gutterBottom component="div" align="center">
            Tax
          </Typography>

          {fields.map((field) => (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" gutterBottom component="div">
                    Field: #{field.id}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DataGrid
                    sx={{ height: "75%" }}
                    key={field.id}
                    columns={columns}
                    rows={field.taxes}
                    components={{ Toolbar: CustomToolbar }}
                  />
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};
