import React from 'react'
import './styles/styles.css'

export default function Asset(props) {
    const numberFormat = (number) => {
      return  number.toLocaleString()
    }

    const percentChange = (percent) => {
        
     let s = percent.toString()
    return  s.includes("-") ? <p className="price-change-neg">{percent}%</p> : <p className="price-change-neg">{percent}%</p>
    }
    return (
        <table className="asset-table">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>24hr %</th>
                <th>Market Cap</th>
                
            </tr>
            {props.assets.map(asset => (
                
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
