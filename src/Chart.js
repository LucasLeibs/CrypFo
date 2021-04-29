import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import {XYPlot, LineSeries, Hint} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';
import { useLocation} from "react-router-dom";
export default function Chart() {
   const [hintValue, setHint] = useState('')
   
  const _onMouseLeave = () => {
    setHint('');
  };

 const _onNearestX = (value) => {
    setHint(value)
  
  };


    const { state } = useLocation();
   
    const loopData = () => {
        let data = []
        for(let i = 0; i < state.prices.length; i++) {
            data.push({x:i, y:state.prices[i][1]})
        }
       return data
    }
    
    const data = loopData() 
    const graphColor = () => {
        return state.prices[state.prices.length-1][1] > state.prices[0][1] ? "green" : "red"
     }
    return (
   <div className="chart-page-container">
          <XYPlot onMouseLeave={_onMouseLeave} height={300} width={500}><LineSeries onNearestX={_onNearestX} color={state.prices.length > 0 ? graphColor() : 'blue'} className="line" data={data}/>
         <Hint value={hintValue}><div style={{background: 'black'}}>
    
    <p>{hintValue.y}</p>
  </div></Hint>
          </XYPlot>
   </div>
    )
}

