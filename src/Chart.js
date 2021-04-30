import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import {XYPlot, LineSeries, Hint, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';
import { useLocation} from "react-router-dom";
import moment from 'moment';

export default function Chart() {
   const [hintValue, setHint] = useState('')
   const [dailyPrices, setDailyPrices] = useState([])
   const [showDaily, setShowDaily] = useState(false)
  const _onMouseLeave = () => {
    setHint('');
  };

 const _onNearestX = (value) => {
    setHint(value)
  
  };

  useEffect (() => {
 

        fetch(`https://api.coingecko.com/api/v3/coins/${state.asset.id}/market_chart?vs_currency=usd&days=1`)
        .then(res => res.json())
        .then(data => { 
            setDailyPrices(data.prices)
           
        })
    

  }, [])

console.log(dailyPrices)
    const { state } = useLocation();
   
    const loopData = () => {
        let data = []
        for(let i = 0; i < state.prices.length; i++) {
            data.push({x: new Date(state.prices[i][0]), y:state.prices[i][1]})
        }
    //  console.log(data)
       return data
    }
    
    const data = loopData() 
    const graphColor = () => {
        return state.prices[state.prices.length-1][1] > state.prices[0][1] ? "green" : "red"
     }

     const dateValues = () => {
         
     
      
        //  console.log(state.prices.map(data => data[0][0]))

     }
  
     const dailyChart = () => {
        setShowDaily(!showDaily)
        loopDailyData()
       
     }
   
     const loopDailyData = () => {
         let dailyData = []
        for(let i = 0; i < dailyPrices.length; i++) {
            dailyData.push({x: new Date(dailyPrices[i][0]), y:dailyPrices[i][1]})
        }
       return dailyData
     }
    return (
   <div className="chart-page-container">
       {showDaily === false ?
          <XYPlot xType="time" onMouseLeave={_onMouseLeave} height={400} width={700}>  
      
      
        <YAxis title="Price"></YAxis>
        <XAxis tickValues={dateValues()} title="Date"></XAxis><LineSeries onNearestXY={_onNearestX} color={state.prices.length > 0 ? graphColor() : 'blue'} className="line" data={data}/>
         <Hint value={hintValue}>
             <div style={{background: 'black'}}>
    <p>{hintValue.y} </p>
    <p>{moment(hintValue.x).format("MMM Do YY")}</p>

  </div></Hint>
          </XYPlot>
: 

<XYPlot xType="time" onMouseLeave={_onMouseLeave} height={400} width={700}>  

      
<YAxis title="Price"></YAxis>
<XAxis title="Time"></XAxis><LineSeries onNearestXY={_onNearestX} color={"blue"} className="line" data={loopDailyData()}/>
 <Hint value={hintValue}>
     <div style={{background: 'black'}}>
<p>{hintValue.y} </p>
<p>{moment(hintValue.x).calendar()}</p>

</div></Hint>
  </XYPlot>}
          <button onClick={() => dailyChart()}>Daily Chart</button>
   </div>
    )
}

