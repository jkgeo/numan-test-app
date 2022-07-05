import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import proj4 from "proj4";
import { area, intersect } from '@turf/turf';
import { arcgisToGeoJSON, geojsonToArcGIS } from "@terraformer/arcgis"
import 'leaflet-draw/dist/leaflet.draw'
import * as omnivore from '@mapbox/leaflet-omnivore'
import JSZip from 'jszip';

import "leaflet-geosearch/dist/geosearch.css";
import {GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import icon from "./SearchMarker.js";

import { 
    MapContainer, 
    TileLayer, 
    LayersControl,
    FeatureGroup,
    useMap 
} from 'react-leaflet'

import Button from '@mui/material/Button';
import { Box } from '@mui/material';

function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
  
      const searchControl = new GeoSearchControl({
        provider,
        marker: {
          icon
        }
      });
  
      map.addControl(searchControl);
  
      return () => map.removeControl(searchControl);
    }, []);
  
    return null;
  }

const Layers = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    let map = useMap();
    
    const geojson_styles = {
        'tax_lots':{ 
            stroke: true,
            fillColor: 'white',
            fillOpacity: 0, 
            color: 'black',
            weight: 1
        },
        'soils':{ 
            stroke: true,
            fillColor: 'white',
            fillOpacity: 0, 
            color: 'orange',
            weight: 1
        },
        'watersheds':{ 
            stroke: true,
            fillColor: 'white',
            fillOpacity: 0, 
            color: 'blue',
            weight: 1
        },
        'counties':{ 
            stroke: true,
            fillColor: 'white',
            fillOpacity: 0, 
            color: 'gray',
            weight: 1
        },
        'physios':{ 
            stroke: true,
            fillColor: 'white',
            fillOpacity: 0, 
            color: 'yellow',
            weight: 1
        }
    };

    const geojson_target_attrs = {
        'tax_lots': ['ACCTID', 'OWNNAME1', 'OWNNAME2'],
        'soils': ['musym', 'muname'],
        'watersheds': ['four_digit'],
        'counties': ['county'],
        'physios': ['province']
    };

    useEffect(()=>{

        const drawnItems = L.featureGroup().addTo(map);

        map.addControl(new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                poly: {
                    allowIntersection: false
                }
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true
                }, 
                polyline:false,
                marker:false,
                circle:false,
                circlemarker:false,
                rectangle:false
            }
        }));

        map.on(L.Draw.Event.CREATED, function (event) {
            let layer = event.layer;
            drawnItems.addLayer(layer);
            evaluateAllFields();
            // dispatch({type: 'layers', value: drawnItems})
        });
    
        map.on('draw:edited', function (event) {
            evaluateAllFields();
        });
    
        map.on('draw:deleted', function (event) {
            let layer = event
            console.log(layer)
            console.log(drawnItems)
            evaluateAllFields();
            // drawnItems.removeLayer(layer)
            // dispatch({type: 'layers', value: drawnItems})
            // console.log('here')
        });

        
        const esriUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        const esriAttrib = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        const osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        
        const Esri_WorldImagery = L.tileLayer(esriUrl, {attribution: esriAttrib});
        const osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib })
        
        let control = L.control.layers({
            'Esri Imagery': Esri_WorldImagery.addTo(map),
            'Streets': osm,
            'Google Imagery': L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
                attribution: 'google'
            })
        }, { 'Field Boundary': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);

        let results_table = {};

        function update_table(){
            // $("#results").html("");
            let keys = Object.keys(results_table);
            let int_keys = keys.map(x => parseInt(x));
            int_keys.sort();
            let last_key = String(int_keys.at(-1));
            let latest_update = results_table[last_key];
            let field_nums = Object.keys(latest_update);
            field_nums.forEach(function(field_num){
                let outputhtml = "<p><strong>Field #"+field_num+"</strong></p>";
                let layer_types = Object.keys(results_table[last_key][field_num]);
                layer_types.sort()
                layer_types.forEach(function(layer_type){
                    outputhtml += "<p><em>"+layer_type+"</em></p><ol>";
                    let layer_arr = results_table[last_key][field_num][layer_type];
                    layer_arr.sort(function(a,b) { 
                        return parseFloat(b.area) - parseFloat(a.area);
                    });
                    layer_arr.forEach(function(result_obj){
                        outputhtml += "<li>" + [result_obj['superkey'], result_obj['area']+"sq. m.", result_obj['pct']+"%"].join(", ")+ "</li>";
                    });
                    outputhtml += "</ol>";
                });
                
                // $("#results").append(outputhtml);
            });
            dispatch({type:'results', value: results_table })
            // results_table[q_set][field_idx][query_type]
        };

        let geojson_layers = {};
        let layer_names = Object.keys(geojson_target_attrs);
        layer_names.forEach(function(lyr_name){
            geojson_layers[lyr_name] = L.geoJson(null, {
                style: function (feature) {
                    return geojson_styles[lyr_name];
                }
            }).addTo(map);
        });

        function geojson_callback(data, user_poly, q_set, field_idx, query_type){
            let features = data['features'];
            results_table[q_set][field_idx][query_type] = [];
            let user_field_area = area(user_poly);
            features.forEach(function(feature){
                let intersection = intersect(user_poly, feature);
                let new_geojson_object = L.geoJSON(intersection, {
                    style: function (feature) {
                        return geojson_styles[query_type];
                    }
                });
                geojson_layers[query_type].addData(intersection);
                // Record the area of the intersection in square meters.
                let target_attrs = geojson_target_attrs[query_type];
                let target_values = [];
                target_attrs.forEach(function(attribute){
                    target_values.push(feature['properties'][attribute]);
                });
                let superkey = target_attrs.join(' | ');
                let joinedvalues = target_values.join(' | ');
                let intersect_area = area(intersection);
                let results = {
                    superkey: joinedvalues,
                    'area':intersect_area.toFixed(2),
                    'pct':(100. * (area(intersection) / user_field_area)).toFixed(2)
                }; 
                results_table[q_set][field_idx][query_type].push(results);
            });
            update_table();
        };

        const sdat_rest_query_base = 'https://geodata.md.gov/imap/rest/services/PlanningCadastre/MD_ParcelBoundaries/MapServer/0/query';
        const geoserver_soil_query_base = 'https://bitbybitmapping.com/geoserver/numan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=numan%3Amapunits_with_attributes&maxFeatures=50&srsName=EPSG:4326&outputFormat=application/json&';
        const geoserver_watersheds_query_base = 'https://bitbybitmapping.com/geoserver/numan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=numan%3Awatersheds&maxFeatures=50&srsName=EPSG:4326&outputFormat=application/json&';
        const geoserver_counties_query_base = 'https://bitbybitmapping.com/geoserver/numan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=numan%3Acounties&maxFeatures=50&srsName=EPSG:4326&outputFormat=application/json&';
        const geoserver_physiographic_query_base = 'https://bitbybitmapping.com/geoserver/numan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=numan%3Aphysiographic&srsName=EPSG:4326&maxFeatures=50&outputFormat=application/json&';
    
        function get_sdat_query_string(rings_filter){
            let sdat_query_params = {
                'geometry':rings_filter,
                'geometryType':'esriGeometryPolygon',
                'spatialRel':'esriSpatialRelIntersects',
                'outFields':'ACCTID,OWNNAME1,OWNNAME2',
                'outSR':'4326',
                'returnGeometry':'true',
                'returnTrueCurves':'false',
                'returnIdsOnly':'false',
                'returnCountOnly':'false',
                'returnZ':'false',
                'returnM':'false',
                'returnDistinctValues':'false',
                'returnExtentOnly':'false',
                'featureEncoding':'esriDefault',
                'resultRecordCount':10,
                'f':'geojson'
            };
            let sdat_query_string = new URLSearchParams(sdat_query_params).toString();
            return sdat_query_string;
        }

        let query_set = 0;
        // Run this any time there is a new field added or an existing field has been modified
        function evaluateAllFields(){
            // Step 0) Prepare the output layers by removing existing entries from them
            layer_names.forEach(function(lyr_name){
                geojson_layers[lyr_name].clearLayers();
            });
            // Step 1) Loop over the fields, create a copy of the geometry in Esri format (to find tax id) and geoserver CQL format (to find everything else)
            let fields = drawnItems.getLayers();
            let this_index = 0;
            query_set = query_set + 1;
            results_table[query_set] = {};
            fields.forEach(function(field){
                this_index += 1;
                results_table[query_set][this_index] = {};
                // Add a label to the field so the user can reference it later
                field.bindTooltip("Field "+this_index.toString(), {"permanent":true}).openTooltip();
    
                // Convert the coordinates into Esri-style polygon, retain epsg:4326 to match existing MD state service
                let field_geojson = field.toGeoJSON();
                let esri_object = geojsonToArcGIS(field_geojson);
                let esri_object_rings = JSON.stringify(esri_object['geometry']['rings']);
                let geometry_filter = '{"rings":'+esri_object_rings+',"spatialReference": {"wkid": 4326}}';
                //console.log(field);
                // Convert the coordinates into the mercator projection for Geoserver to use
                let coords_projected_mercator = field._latlngs[0].map(x => proj4('EPSG:4326','EPSG:3857', [x.lng, x.lat]));
                coords_projected_mercator.push(coords_projected_mercator[0]);
                let formatted_coords = coords_projected_mercator.map(x => x[0].toString() + ' ' + x[1].toString()).toString();
                //field_polys.push("((" + formatted_coords + "))");
                let cql_filter = "cql_filter=INTERSECTS(geom,MULTIPOLYGON(((" + formatted_coords + "))))";
    
                // Step 2) Send AJAX requests out to the respective services
                // Step 3) Set up individual callbacks to handle responses, clip them to the input geometry using TurfJS
                // Step 4) Gather the data in a centralized data structure - make sure that new entries always overwrite old responses
    
                // State of MD ArcGIS Server Tax Lot ID query
                let sdat_q_string = get_sdat_query_string(geometry_filter);
                // need to re-scope the index to this block, otherwise it will only write the last field values
                let out_idx = this_index;
                $.post(sdat_rest_query_base, sdat_q_string, function(sdat_data){
                    geojson_callback(sdat_data, field_geojson, query_set, out_idx, 'tax_lots');
                });
    
                // // Soil query
                $.post(geoserver_soil_query_base, cql_filter, function(soil_data){
                    geojson_callback(soil_data, field_geojson, query_set, out_idx, 'soils');
                });
    
                // // Watershed query
                $.post(geoserver_watersheds_query_base, cql_filter, function(watershed_data){
                    geojson_callback(watershed_data, field_geojson, query_set, out_idx, 'watersheds');
                });
    
                // // Counties query
                $.post(geoserver_counties_query_base, cql_filter, function(county_data){
                    geojson_callback(county_data, field_geojson, query_set, out_idx, 'counties');
                });
    
                // // Physiographic Regions query
                $.post(geoserver_physiographic_query_base, cql_filter, function(physiographic_data){
                    geojson_callback(physiographic_data, field_geojson, query_set, out_idx, 'physios');
                });
            });
        };
        // Add remove loading class on body element based on Ajax request status
        $(document).on({
            ajaxStart: function(){
                $("body").addClass("loading"); 
            },
            ajaxStop: function(){ 
                $("body").removeClass("loading"); 
            }    
        });

        // Handle weird reload situations
        $('#fileInput').on('click touchstart' , function(){
            $(this).val('');
        });

        let custom_layer = null;
        var highlightStyle1 = {
            fillColor: "00FFFFFF",
            weight: 3,
            opacity: 1,
            color: "blue",
            fillOpacity:0.0
        };

        function parse_layers(current_layer){
            // check to see if the getLayers method exists, if it does then keep going down the tree
            if (typeof current_layer.getLayers === 'function'){
                let sublayers = current_layer.getLayers();
                // This is a list we need to recurse 
                sublayers.forEach(function(sublayer){
                    parse_layers(sublayer);
                });
            }else{
                if (area(current_layer.toGeoJSON()) > 1000){
                    drawnItems.addLayer(current_layer);
                };
            }
        };

        //Trigger now when you have selected any file 
        $("#fileInput").change(function(e) {
            console.log(this.files);
            let lower_fn = this.files[0].name.toLowerCase();
            console.log(this);
            if (lower_fn.endsWith('.kmz')){
                let zip = new JSZip();
                zip.loadAsync( this.files[0] /* = file blob */)
                    .then(function(zip) {
                        // process ZIP file content here
                        return zip['files']['doc.kml'].async("string");
                    })
                    .then(function success(kml){
                        custom_layer = omnivore.kml.parse(kml);
                        custom_layer.setStyle(highlightStyle1);
                        //custom_layer.addTo(map);
                        parse_layers(custom_layer);
                        map.fitBounds(custom_layer.getBounds());
                        evaluateAllFields();
                        custom_layer = null;
                    });
            }else if (lower_fn.endsWith('.kml')){
                this.files[0].text().then(function(kml){
                    custom_layer = omnivore.kml.parse(kml);
                    custom_layer.setStyle(highlightStyle1);
                    //custom_layer.addTo(map);
                    parse_layers(custom_layer);
                    map.fitBounds(custom_layer.getBounds());
                    evaluateAllFields();
                    custom_layer = null;
                });
            }
        });

    }, [])

    return null;
}


export const PrimaryMap = () => {

    return (
        <Box sx={{mt: 7}}>  
            <MapContainer center={[39, -76]} zoom={13}
                style={{
                    width: '600px',
                    height: '500px',
                    border: '1px solid #ccc',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                <LeafletgeoSearch />    
                <Layers />        
            </MapContainer>

            <p style={{textAlign: 'center'}} >
                Load Field Boundaries from a KMZ/KML file:
                <label htmlFor="fileInput">
                    <input style={{display: 'none'}} id="fileInput" type="file"></input>
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
            </p>
            
        </Box>
    )
}
