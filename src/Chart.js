import React, { useState, useEffect } from "react";
import MediaQuery from 'react-responsive'
import { XYPlot, LineSeries, Hint, XAxis, YAxis, MarkSeries } from "react-vis";
import "../node_modules/react-vis/dist/style.css";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import VisibilitySensor from "react-visibility-sensor";


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

  const percentSupply = (asset) => {
    let percent = (asset.circulating_supply * 100) / asset.max_supply;

    return `${percent.toString().slice(0, 4)} %`;
  };
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
       {/* <div id="title">
       <img src={state.asset.image}></img>
       <p id="symbol">{state.asset.symbol.toUpperCase()}</p>
       </div> */}
   
       <h1> {state.asset.id.replace(state.asset.id.charAt(0), state.asset.id.charAt(0).toUpperCase())} price: <data>${state.asset.current_price.toLocaleString()}</data></h1>
     <data>{hintValue ? moment(hintValue.x).calendar() : ''}</data>
     <p className="data-point">{hintValue ?  '$' + hintValue.y.toLocaleString(): ''}</p>
     <data>{hintValue ? graphDataPercentChange(): ''}</data>
          </div>
          { dailyPrices.length === 0 ? 
              <Loader
              type="Audio"
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
            <div className="mobile-asset">
              
              
          <div className="coin-stats">
          <h2>Market Stats</h2>
          <div className="stat">
           
            <div className="desc">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />

</svg>
<h3>Market Cap</h3>
</div>
          <h3>${state.asset.market_cap.toLocaleString()}</h3>
          </div>
          <div className="stat">
            <div className="desc">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<h3>Market Rank</h3>
</div>
          <h3> #{state.asset.market_cap_rank}</h3>
          </div>
          <div className="stat">
            <div className="desc">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
</svg>
<h3>Price Change(24hr)</h3>
</div>
          <h3>${state.asset.price_change_24h.toLocaleString()}</h3>
          </div>
          <div className="stat">
            <div className="desc">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
</svg>
<h3>All Time High</h3>
</div>
          <h3>${state.asset.ath.toLocaleString()}</h3>
          </div>
          </div>
          <h2>Circulating Supply</h2>
              {state.asset.max_supply == null ? '' :
                <p>Max Supply: {state.asset.max_supply.toLocaleString()} {state.asset.symbol.toUpperCase()}<br></br>
                {percentSupply(state.asset)} of supply is in circulation</p>
              }
            
              
            <section className="circle-graph">
         
          { state.asset.max_supply == null ? (
             
            <CircularProgressbar
              value={state.asset.circulating_supply}
              maxValue={state.asset.max_supply}
              text={"No Max"}
              styles={buildStyles({
                pathColor: `#338ee4`,
                textColor: "",
                trailColor: "white",
                backgroundColor: '#338ee4',
              })}
            />
          ) : (
            <VisibilitySensor offset={{bottom:-85}}>
            {({ isVisible }) => {
              const percentage = isVisible ? state.asset.circulating_supply : 0;
              
              return (
                <CircularProgressbar
                  value={percentage}
                  maxValue={state.asset.max_supply}
                  text={percentSupply(state.asset)}
                  styles={buildStyles({
                    pathColor: `#338ee4`,
                    textColor: "",
                    trailColor: "white",
                    backgroundColor: "#3e98c7",
                    pathTransitionDuration: 2,
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  })}
                />
              )
                }}
                </VisibilitySensor>
          )
          }
          
          </section>
          </div>
        </MediaQuery>
      
    </div>
  );
}
