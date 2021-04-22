import React from 'react'
import './styles/styles.css'


const percentChangeIcons = [
    <svg xmlns="http://www.w3.org/2000/svg" id="down-arrow" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
</svg>,
<svg xmlns="http://www.w3.org/2000/svg" id="up-arrow" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
</svg>
]

export default function Asset(props) {
    const numberFormat = (number) => {
      return  number.toLocaleString()
    }

    const percentChange = (percent) => {
    
     let s = percent.toString()
     
    return  s.includes("-") ? <p className="price-change-neg">{percentChangeIcons[0]}{s.replace("-", "")}%</p> : <p className="price-change-pos">{percentChangeIcons[1]}{s}%</p>
    }

    return (
        <table className="asset-table">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>24hr %</th>
                <th>Market Cap</th>
                
            </tr>
            {props.filterAssets.map(asset => (
                
                <tr>
                    <td className="name">
                    <p><img src={asset.image}></img>{asset.id}</p>
                    </td>
                    <td>
                        <p> $ {numberFormat(asset.current_price)}</p>
                    </td>
                    <td>
                        {percentChange(asset.price_change_percentage_24h)}
                    </td>
                    <td>
                        {numberFormat(asset.market_cap)}
                    </td>
                </tr>
            ))}
        </table>
    )
}
