import React, { useState } from 'react'
import './styles/styles.css'
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis'
import IndividualAsset from './IndividualAsset'

const info = <svg id="info" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
</svg>



export default function Asset(props) {


    
  
   
      
    return (
        <table className="asset-table">
            <tr>
                <th className="name-label">Name</th>
              
                <th>Price </th>
                <th>24hr % {info}</th>
                <th>Market Cap{info}</th>
                <th>Circulating Supply{info}</th>
                <th id="graph">Last 7 days{info}</th>
                
            </tr>
            {props.filterAssets.map(asset => (
                <IndividualAsset asset={asset}/>
               
            ))}
        </table>
    )
}
