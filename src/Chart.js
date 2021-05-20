import React, { useState, useEffect } from "react";
import MediaQuery from 'react-responsive'
import { XYPlot, LineSeries, Hint, XAxis, YAxis, MarkSeries } from "react-vis";
import "../node_modules/react-vis/dist/style.css";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const percentChangeIcons = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="down-arrow1"
      className="h-6 w-6"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
        clipRule="evenodd"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="up-arrow1"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
        clipRule="evenodd"
      />
    </svg>,
  ];

export default function Chart() {
  const [hintValue, setHint] = useState("");
  const [dailyPrices, setDailyPrices] = useState([]);
  const [loopData, setLoopData] = useState([])
 const [highlighted, setHighlight] = useState('daily')
const [days7, set7Day] = useState([]);
const [month, setMonthData] = useState([])
const [month3, set3MonthData] = useState([])
const [year, setYearData] = useState([])
const [hoveredNode, setHoveredNode] = useState(null)
  const _onMouseLeave = () => {
    setHint("");
  };

  const _onNearestX = (value) => {
    setHint(value);
    setHoveredNode(value)
  };
  const fetchData = (days) => {

    fetch(
      `https://api.coingecko.com/api/v3/coins/${state.asset.id}/market_chart?vs_currency=usd&days=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoopData(data.prices);
        setDailyPrices(data.prices)
      });
    fetch(
      `https://api.coingecko.com/api/v3/coins/${state.asset.id}/market_chart?vs_currency=usd&days=7`
    )
      .then((res) => res.json())
      .then((data) => {
        set7Day(data.prices);
      });
    fetch(
      `https://api.coingecko.com/api/v3/coins/${state.asset.id}/market_chart?vs_currency=usd&days=60`
    )
      .then((res) => res.json())
      .then((data) => {
        setMonthData(data.prices);
      });
    fetch(
      `https://api.coingecko.com/api/v3/coins/${state.asset.id}/market_chart?vs_currency=usd&days=180`
    )
      .then((res) => res.json())
      .then((data) => {
        set3MonthData(data.prices);
      });
    fetch(
      `https://api.coingecko.com/api/v3/coins/${state.asset.id}/market_chart?vs_currency=usd&days=360`
    )
      .then((res) => res.json())
      .then((data) => {
        setYearData(data.prices);
      });
    
  }

  useEffect(() => {
    fetchData()
 
  }, []);

  const toggleCharts = (e, state) => {

    setLoopData(state)
   setHighlight(e.target.value.toString())
   console.log(highlighted)
  }

  console.log(dailyPrices);
  const { state } = useLocation();



  const graphColor = () => {
    if (loopData.length > 0) {
    return loopData[loopData.length - 1][1] > loopData[0][1]
      ? "#32cf4c"
      : "#f75452"
    }
      else {
        return 'blue'
      }
  };
 

  const percentChange = (percent) => {
    let s = percent.toString();

    return s.includes("-") ? (
      <div className="p-change-neg">
        {percentChangeIcons[0]}
        {s.replace("-", "").slice(0, 4)}%
        </div>
    ) : (
      <div className="p-change-pos">
        {percentChangeIcons[1]}
        {s.slice(0, 5)}%
      </div>
    );
  };

  const graphDataPercentChange = () => {
     let percentFromData = (1 - hintValue.y / state.asset.current_price) * 100
     let string = percentFromData.toString()
     return string.includes('-') ? <data className="negative">{string.slice(0,5)}%</data> : <data className="positive">{string.slice(0,4)}%</data>
  }


  const loopDailyData = (state) => {
   
    let dailyData = [];
    for (let i = 0; i < loopData.length; i++) {
      dailyData.push({ x: new Date(loopData[i][0]), y: loopData[i][1] });
    }
    return dailyData;
  }
  return (
    <div className="chart-page-container">
      <MediaQuery minDeviceWidth={1340}>
      <section className="chart">
          <div className="chart-buttons">
              <button value="daily" className={highlighted == 'daily' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e,dailyPrices)}>1D</button>
              <button value="week" className={highlighted == 'week' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e, days7)}>7D</button>
              <button value="monthly" className={highlighted == 'monthly' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e, month)}>1M</button>
              <button value="month3" className={highlighted == 'month3' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e, month3)}>3M</button>
              <button value="year" className={highlighted == 'year' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e, year)}>1Y</button>
              </div>
            
        <XYPlot
          xType="time"
          onMouseLeave={_onMouseLeave}
          height={500}
          width={700}
        >
          <YAxis tickFormat={(v) => `${v.toString().slice(0, 2)}K`} title="Price"></YAxis>
          <XAxis title="Time"></XAxis>
          {hoveredNode && <MarkSeries color="grey" data={[hoveredNode]} />}
          <LineSeries
            onNearestXY={_onNearestX}
            color={graphColor()}Y

            className="line"
            animation={'gentle'}
            data={loopDailyData()}
            onSeriesMouseOut={() => {setHint('')}}
          />
        {hintValue ? 
          <Hint value={hintValue}>

            <div className="hint">
              <p><strong>Price: {hintValue.y.toLocaleString()}   ( {graphDataPercentChange()} )</strong></p>
              <p><strong>Date: {moment(hintValue.x).calendar()}</strong></p>
            
            </div>
        

          </Hint>
: <></> }
        </XYPlot>
       
       

      </section>
     
      <section className="chart-asset-info">
      <div className="current-price">
      
     <h1>Current price: <data>$ {state.asset.current_price.toLocaleString()}</data></h1>
     {percentChange(state.asset.price_change_percentage_24h)}
          </div>
          <div className="chart-asset-header">
          <img src={state.asset.image}></img>
        <h1> {state.asset.id.replace(state.asset.id.charAt(0), state.asset.id.charAt(0).toUpperCase())}</h1>
        <h1 className="chart-symbol">{state.asset.symbol.toUpperCase()}</h1>
        </div>
      <table className="table">
        <tr>
          <td className="key">Price Change</td>
          <td className="value">{ state.asset.price_change_percentage_24h.toString().includes('-') ?  `$ ${state.asset.price_change_24h.toLocaleString()}`: `+ $${state.asset.price_change_24h.toLocaleString()}`}</td>
          </tr>
          <tr>
          <td className="key">All Time High</td>
          <td className="value">${state.asset.ath.toLocaleString()}</td>
          </tr>
          <tr>
          <td className="key">Market Rank</td>
          <td className="value">{state.asset.market_cap_rank}</td>
          </tr>
          
      </table>
         
       
      </section>
       </MediaQuery>
       
       <MediaQuery maxDeviceWidth={1339}>
       <div className="current-price">
       {percentChange(state.asset.price_change_percentage_24h)}
       <h1>{state.asset.id.replace(state.asset.id.charAt(0), state.asset.id.charAt(0).toUpperCase())} price:<data>$ {state.asset.current_price.toLocaleString()}</data></h1>
     <data>{hintValue ? moment(hintValue.x).calendar() : ''}</data>
     <p>{hintValue ?  '$' + hintValue.y.toLocaleString(): ''}</p>
     <data>{hintValue ? graphDataPercentChange(): ''}</data>
          </div>
          { dailyPrices.length === 0 ? 
              <Loader
              type="Ball-Triangle"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
            :
        <XYPlot
          xType="time"
          onMouseLeave={_onMouseLeave}
          height={400}
          width={375}
       
        >
       
          {hoveredNode && <MarkSeries color="grey" data={[hoveredNode]} />}
          <LineSeries
            onNearestX={_onNearestX}
            color={graphColor()}

            className="line"
            animation={'gentle'}
            data={loopDailyData()}
            onSeriesMouseOut={() => {setHint('')}}
          />
        
        </XYPlot>
}
        <div className="chart-buttons">
              <button value="daily" className={highlighted == 'daily' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e,dailyPrices)}>1D</button>
              <button value="week" className={highlighted == 'week' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e, days7)}>7D</button>
              <button value="monthly" className={highlighted == 'monthly' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e, month)}>1M</button>
              <button value="month3" className={highlighted == 'month3' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e, month3)}>3M</button>
              <button value="year" className={highlighted == 'year' ? 'highlighted-button' : 'button'} onClick={(e) => toggleCharts(e, year)}>1Y</button>
              </div>
        </MediaQuery>
      
    </div>
  );
}
