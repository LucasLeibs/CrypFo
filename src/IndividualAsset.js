import React, { useState, useEffect } from "react";
import "../node_modules/react-vis/dist/style.css";
import { XYPlot, LineSeries } from "react-vis";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "react-circular-progressbar/dist/styles.css";
import MediaQuery from 'react-responsive'
import { Link } from "react-router-dom";

const percentChangeIcons = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="down-arrow"
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
    id="up-arrow"
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
export default function IndividualAsset({ asset }) {
  const [prices, setPrices] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const loopData = () => {
    let data = [];
    for (let i = 0; i < asset.sparkline_in_7d.price.length; i++) {
      data.push({ x: i, y: asset.sparkline_in_7d.price[i] });
    }
    return data;
  };
  const data = loopData();

  const numberFormat = (number) => {
    return Math.floor(number).toLocaleString();
  };

  const percentChange = (percent) => {
    let s = percent.toString();

    return s.includes("-") ? (
      <p className="price-change-neg">
        {percentChangeIcons[0]}
        {s.replace("-", "").slice(0, 4)}%
      </p>
    ) : (
      <p className="price-change-pos">
        {percentChangeIcons[1]}
        {s.slice(0, 5)}%
      </p>
    );
  };
  const graphColor = () => {
    return asset.sparkline_in_7d.price[asset.sparkline_in_7d.price.length - 1] > asset.sparkline_in_7d.price[0] ? "green" : "red";
  };

  const percentSupply = (asset) => {
    let percent = (asset.circulating_supply * 100) / asset.max_supply;

    return `${percent.toString().slice(0, 4)} %`;
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title>
        <strong>
          {asset.id.replace(
            asset.id.charAt(0),
            asset.id.charAt(0).toUpperCase()
          )}
        </strong>
      </Popover.Title>
      <Popover.Content>
        {percentSupply(asset)} of supply is in circulation
      </Popover.Content>
      <Popover.Content>
        Circulating Supply: {numberFormat(asset.circulating_supply)}{" "}
        {asset.symbol.toUpperCase()}
      </Popover.Content>
      <Popover.Content>
        Total: {numberFormat(asset.max_supply)} {asset.symbol.toUpperCase()}
      </Popover.Content>
    </Popover>
  );

  return (
    <tr className="row">
      <MediaQuery minDeviceWidth={1340}>
      <td className="name">
        <p>
          <img src={asset.image}></img>
          {asset.id.replace(
            asset.id.charAt(0),
            asset.id.charAt(0).toUpperCase()
          )}{" "}
          <h3>{asset.symbol.toUpperCase()}</h3>
        </p>
      </td>

      <td className="price">
        <p> $ {asset.current_price.toLocaleString()}</p>
      </td>
      <td>{percentChange(asset.price_change_percentage_24h)}</td>
      <td>{numberFormat(asset.market_cap)}</td>
      <td className="supply">
        <p>
          {numberFormat(asset.circulating_supply)} {asset.symbol.toUpperCase()}
        </p>

        <div className="circle-graph" style={{ width: 50, height: 50 }}>
          {asset.max_supply == null ? (
            <CircularProgressbar
              value={asset.circulating_supply}
              maxValue={asset.max_supply}
              text={"No Max"}
              styles={buildStyles({
                pathColor: `#d4d9d5`,
                textColor: "",
                trailColor: "white",
                backgroundColor: "#d4d9d5",
              })}
            />
          ) : (
            <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
              <div>
                <CircularProgressbar
                  value={asset.circulating_supply}
                  maxValue={asset.max_supply}
                  text={percentSupply(asset)}
                  styles={buildStyles({
                    pathColor: `#0aa5c4`,
                    textColor: "",
                    trailColor: "white",
                    backgroundColor: "#3e98c7",
                    pathTransitionDuration: 2,
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  })}
                />
              </div>
            </OverlayTrigger>
          )}
        </div>
      </td>
      <td>
        <div>
          <XYPlot height={100} width={200}>
            <LineSeries
              color={asset.sparkline_in_7d.price.length > 0 ? graphColor() : "blue"}
              className="line"
              data={data}
            />
          </XYPlot>
        </div>
        <Link
          to={{
            pathname: `/charts/${asset.id}`,
            state: { asset: asset },
          }}
        >
          charts
        </Link>
      </td>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1339}>
      <td className="name">
      <Link
      className="link"
          to={{
            pathname: `/charts/${asset.id}`,
            state: { asset: asset },
          }}
        >
          <p>
          <img src={asset.image}></img>
          {asset.id.replace(
            asset.id.charAt(0),
            asset.id.charAt(0).toUpperCase()
          )}{" "}
          <h3>{asset.symbol.toUpperCase()}</h3>
        </p>
        </Link>
       
      </td>

      <td className="price">
        <p> $ {asset.current_price.toLocaleString()}</p>
        {percentChange(asset.price_change_percentage_24h)}
      </td>
     
    
      </MediaQuery>
    </tr>
  );
}
