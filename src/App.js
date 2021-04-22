import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Search from './Search'

function App() {
  const [asset, setAsset] = useState('BTC');
 const [assetInfo, setAssetInfo] = useState({
   name: '',
   price: 0,
 })
 const [icon, setIcon] = useState('');
  

  const query = (asset) => {
    fetch(`https://rest.coinapi.io/v1/assets/${asset}?apikey=3DB0B8D6-BD54-4D47-9F9D-B276C963304E`)
    .then(res => res.json())
    .then(data => setAssetInfo({
      name: data[0].name,
      price: data[0].price_usd,
    }));
  }
 
  //  useEffect(() => {
  //   fetch(`https://rest.coinapi.io/v1/symbols?filter_asset_id=${asset}?apikey=3DB0B8D6-BD54-4D47-9F9D-B276C963304E`)
  //   .then(res => res.json())
  //   .then(data => setIcon(data[0].url))
  //  },[])
  return (
    <div className="App">
     <h1>{assetInfo.name},{assetInfo.price}</h1>
     <img src={assetInfo.icon}></img>
     <Search query={query}></Search>
    </div>
  )
}

export default App;
