import React from 'react'
import './styles/styles.css'

export default function Asset(props) {
    return (
        <div className="asset-table">
            {props.assets.map(asset => (
                <div className="asset-data">
                    <img src={asset.image}></img>
                    <h1>{asset.id}</h1>
                    
                </div>
            ))}
        </div>
    )
}
