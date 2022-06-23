import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Soils = () => {
    const state = useSelector((state) => state);
    let [layers, setLayers] = useState(null)

    return (
        <div id='results'>
            
        </div>
    )
}

