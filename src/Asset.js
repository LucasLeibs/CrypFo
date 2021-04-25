import React, { useState } from 'react'
import './styles/styles.css'
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis'
import IndividualAsset from './IndividualAsset'




export default function Asset(props) {


    
  
   
      
    return (
        <table className="asset-table">
            <tr>
                <th>Name</th>
              
                <th>Price</th>
                <th>24hr %</th>
                <th>Market Cap</th>
                <th>Circulating Supply</th>
                
            </tr>
            {props.filterAssets.map(asset => (
                <IndividualAsset asset={asset}/>
               
            ))}
        </table>
    )
}
