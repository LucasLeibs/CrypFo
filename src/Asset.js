import React, { useState } from 'react'
import './styles/styles.css'
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis'
import IndividualAsset from './IndividualAsset'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import MediaQuery from 'react-responsive'

const info = <svg id="info" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
</svg>



export default function Asset(props) {


    const popover1 = (
        <Popover id="popover-basic">
         
         <Popover.Content>The total value of a cryptocurrency's circulating supply.</Popover.Content>
         <Popover.Content>Market Cap = Current Price X Circulating Supply</Popover.Content>
        
        </Popover>
      )
  
    const popover2 = (
        <Popover id="popover-basic">
         
         <Popover.Content>A measure of how much of a cryptocurrency was traded in the last 24 hours.</Popover.Content>
         
        
        </Popover>
      )
  
    const popover3 = (
        <Popover id="popover-basic">
         
         <Popover.Content>The amount of coins circulating in the market and are in public hands.</Popover.Content>
         
        
        </Popover>
      )
  
   
      
    return (
        
        <table className="asset-table">
            <MediaQuery minDeviceWidth={1340}>
            <tr className="header">
                <th className="name-label">Name</th>
              
                <th>Price </th>
                <th>24hr % <OverlayTrigger trigger="hover" placement="bottom" overlay={popover2}><span>{info}</span></OverlayTrigger></th>
                <th>Market Cap<OverlayTrigger trigger="hover" placement="bottom" overlay={popover1}><span>{info}</span></OverlayTrigger></th>
                <th>Circulating Supply<OverlayTrigger trigger="hover" placement="bottom" overlay={popover3}><span>{info}</span></OverlayTrigger></th>
                <th id="graph">Last 7 days</th>
                
            </tr>
            {props.filterAssets.map(asset => (
                <IndividualAsset key={asset.id} asset={asset}/>
               
            ))}
             </MediaQuery>
             <MediaQuery maxDeviceWidth={1339}>
             <tr className="header">
                <th className="name-label">Name</th>
              
                <th>Price </th>
            
            </tr>
            {props.filterAssets.map(asset => (
                <IndividualAsset key={asset.id} asset={asset}/>
               
            ))}
             </MediaQuery>
        </table>
       
        
    )
}
