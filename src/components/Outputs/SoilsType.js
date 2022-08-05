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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export const SoilsType = () => {
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
          let soilsCheck = {};
          let newSoilList = [];
          let fieldSoils = element["soils"];
          if (fieldSoils) {
            fieldSoils.forEach((soil, index) => {
              soilList.push({
                id: index,
                superkey: soil["superkey"],
                area: Number(soil["area"]),
                pct: Number(soil["pct"]),
              });
            });

            soilList.forEach((soilType) => {
              if (soilType.superkey in soilsCheck) {
                soilsCheck[soilType.superkey].area += soilType.area;
                soilsCheck[soilType.superkey].pct += soilType.pct;
              } else {
                soilsCheck[soilType.superkey] = soilType;
              }
            }, []);

            console.log(soilsCheck);

            for (const s in soilsCheck) {
              newSoilList.push(soilsCheck[s]);
            }
            console.log(newSoilList);
          }
          fieldList.push({ id: fieldID, soils: newSoilList });
        }
      }

      setFields(fieldList);
      console.log(fieldList);
    }
  }, [state]);

  return (
    <Box sx={{ height: 500, width: 750, m: 5, overflow: "auto" }}>
      {fields ? (
        <Box sx={{ height: "100%" }}>
          <Typography variant="h3" gutterBottom component="div" align="center">
            Soils Aggregate
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
