import { getBottomNavigationUtilityClass } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'

export const Soils = () => {
    const state = useSelector((state) => state);
    let [fields, setFields] = useState(null)

    const columns = [
        { 
            field: 'superkey', 
            headerName: 'superkey',
            width: 400
        },
        {
          field: 'area',
          headerName: 'area',
        },
        {
          field: 'pct',
          headerName: 'pct',
        },
      ];
    
    useEffect(()=>{
        if (state.results){
            let results = state.results; 

            let resultKeys = Object.keys(results)
            let lastKey = resultKeys[resultKeys.length - 1]

            let fields = results[lastKey]

            let fieldList = [];

            for (const key in fields) {
                if (Object.hasOwnProperty.call(fields, key)) {
                    const element = fields[key];
                    let fieldID = key;
                    let soilList = []
                    let fieldSoils = element['soils'];
                    if (fieldSoils) {
                        fieldSoils.forEach((soil, index) => {
                            soilList.push({
                                id: index,
                                superkey: soil['superkey'],
                                area: soil['area'],
                                pct: soil['pct']
                            })
                        })
                        fieldList.push({'id': fieldID, 'soils': soilList})
                    }
                    
                }
            }

            setFields(fieldList)
            console.log(fieldList)
        }

    }, [state])

    return (
        <Box sx={{ height: 500, m: 5, overflow: 'auto'}}>
            
        {fields ? 
            <Box sx={{height: '100%'}}>
                <Typography variant="h3" gutterBottom component="div">
                    SOILS
                </Typography>

                {
                fields.map(field => (
                    <>
                        <Typography variant="h6" gutterBottom component="div">
                            Field: #{field.id}
                        </Typography>
                        <DataGrid sx={{height: '75%'}} key={field.id} columns={columns} rows={field.soils} />
                    </>
                    ))
                }

            </Box>
        : null}
        </Box>
    )
}

export const Watershed = () => {
    const state = useSelector((state) => state);
    let [fields, setFields] = useState(null)

    const columns = [
        { 
            field: 'superkey', 
            headerName: 'superkey',
            width: 400
        },
        {
          field: 'area',
          headerName: 'area',
        },
        {
          field: 'pct',
          headerName: 'pct',
        },
      ];
    
    useEffect(()=>{
        if (state.results){
            let results = state.results; 

            let resultKeys = Object.keys(results)
            let lastKey = resultKeys[resultKeys.length - 1]

            let fields = results[lastKey]
            console.log(fields)
            let fieldList = [];

            for (const key in fields) {
                if (Object.hasOwnProperty.call(fields, key)) {
                    const element = fields[key];
                    let fieldID = key;
                    let watershedsList = []
                    let fieldWaters = element['watersheds'];
                    if (fieldWaters) {
                        fieldWaters.forEach((waters, index) => {
                            watershedsList.push({
                                id: index,
                                superkey: waters['superkey'],
                                area: waters['area'],
                                pct: waters['pct']
                            })
                        })
                        fieldList.push({'id': fieldID, 'watersheds': watershedsList})
                    }
                    
                }
            }

            setFields(fieldList)
            console.log(fieldList)
        }

    }, [state])

    return (
        <Box sx={{ height: 500, overflow: 'auto'}}>
            
            {fields ? 
                <Box sx={{height: '100%'}}>
                    <Typography variant="h3" gutterBottom component="div">
                        Watersheds
                    </Typography>

                    {
                    fields.map(field => (
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Field: #{field.id}
                            </Typography>
                            <DataGrid sx={{height: '75%'}} key={field.id} columns={columns} rows={field.watersheds} />
                        </>
                        ))
                    }

                </Box>
            : null}
        </Box>
    )
}

export const Counties = () => {
    const state = useSelector((state) => state);
    let [fields, setFields] = useState(null)

    const columns = [
        { 
            field: 'superkey', 
            headerName: 'superkey',
            width: 400
        },
        {
          field: 'area',
          headerName: 'area',
        },
        {
          field: 'pct',
          headerName: 'pct',
        },
      ];
    
    useEffect(()=>{
        if (state.results){
            let results = state.results; 

            let resultKeys = Object.keys(results)
            let lastKey = resultKeys[resultKeys.length - 1]

            let fields = results[lastKey]
            console.log(fields)
            let fieldList = [];

            for (const key in fields) {
                if (Object.hasOwnProperty.call(fields, key)) {
                    const element = fields[key];
                    let fieldID = key;
                    let countiesList = []
                    let fieldCounties = element['counties'];
                    if (fieldCounties) {
                        fieldCounties.forEach((county, index) => {
                            countiesList.push({
                                id: index,
                                superkey: county['superkey'],
                                area: county['area'],
                                pct: county['pct']
                            })
                        })
                        fieldList.push({'id': fieldID, 'counties': countiesList})
                    }
                    
                }
            }

            setFields(fieldList)
            console.log(fieldList)
        }

    }, [state])

    return (
        <Box sx={{ height: 500, overflow: 'auto'}}>
            
            {fields ? 
                <Box sx={{height: '100%'}}>
                    <Typography variant="h3" gutterBottom component="div">
                        County
                    </Typography>

                    {
                    fields.map(field => (
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Field: #{field.id}
                            </Typography>
                            <DataGrid sx={{height: '75%'}} key={field.id} columns={columns} rows={field.counties} />
                        </>
                        ))
                    }

                </Box>
            : null}
        </Box>
    )
}

export const Physio = () => {
    const state = useSelector((state) => state);
    let [fields, setFields] = useState(null)

    const columns = [
        { 
            field: 'superkey', 
            headerName: 'superkey',
            width: 400
        },
        {
          field: 'area',
          headerName: 'area',
        },
        {
          field: 'pct',
          headerName: 'pct',
        },
      ];
    
    useEffect(()=>{
        if (state.results){
            let results = state.results; 

            let resultKeys = Object.keys(results)
            let lastKey = resultKeys[resultKeys.length - 1]

            let fields = results[lastKey]
            console.log(fields)
            let fieldList = [];

            for (const key in fields) {
                if (Object.hasOwnProperty.call(fields, key)) {
                    const element = fields[key];
                    let fieldID = key;
                    let physiosList = []
                    let fieldPhysios = element['physios'];
                    if (fieldPhysios) {
                        fieldPhysios.forEach((physio, index) => {
                            physiosList.push({
                                id: index,
                                superkey: physio['superkey'],
                                area: physio['area'],
                                pct: physio['pct']
                            })
                        })
                        fieldList.push({'id': fieldID, 'physios': physiosList})
                    }
                    
                }
            }

            setFields(fieldList)
            console.log(fieldList)
        }

    }, [state])

    return (
        <Box sx={{ height: 500, overflow: 'auto'}}>
            
            {fields ? 
                <Box sx={{height: '100%'}}>
                    <Typography variant="h3" gutterBottom component="div">
                        Physios
                    </Typography>

                    {
                    fields.map(field => (
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Field: #{field.id}
                            </Typography>
                            <DataGrid sx={{height: '75%'}} key={field.id} columns={columns} rows={field.physios} />
                        </>
                        ))
                    }

                </Box>
            : null}
        </Box>
    )
}

export const Tax = () => {
    const state = useSelector((state) => state);
    let [fields, setFields] = useState(null)

    const columns = [
        { 
            field: 'superkey', 
            headerName: 'superkey',
            width: 400
        },
        {
          field: 'area',
          headerName: 'area',
        },
        {
          field: 'pct',
          headerName: 'pct',
        },
      ];
    
    useEffect(()=>{
        if (state.results){
            let results = state.results; 

            let resultKeys = Object.keys(results)
            let lastKey = resultKeys[resultKeys.length - 1]

            let fields = results[lastKey]
            console.log(fields)
            let fieldList = [];

            for (const key in fields) {
                if (Object.hasOwnProperty.call(fields, key)) {
                    const element = fields[key];
                    let fieldID = key;
                    let taxList = []
                    let fieldTaxes = element['tax_lots'];
                    if (fieldTaxes) {
                        fieldTaxes.forEach((soil, index) => {
                            taxList.push({
                                id: index,
                                superkey: soil['superkey'],
                                area: soil['area'],
                                pct: soil['pct']
                            })
                        })
                        fieldList.push({'id': fieldID, 'taxes': taxList})
                    }
                    
                }
            }

            setFields(fieldList)
            console.log(fieldList)
        }

    }, [state])

    return (
        <Box sx={{ height: 500, overflow: 'auto'}}>
            
            {fields ? 
                <Box sx={{height: '100%'}}>
                    <Typography variant="h3" gutterBottom component="div">
                        TAX
                    </Typography>

                    {
                    fields.map(field => (
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Field: #{field.id}
                            </Typography>
                            <DataGrid sx={{height: '75%'}} key={field.id} columns={columns} rows={field.taxes} />
                        </>
                        ))
                    }

                </Box>
            : null}
        </Box>
    )
}