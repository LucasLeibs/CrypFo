import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [asset, setAsset] = useState('BTC');
 const [assetInfo, setAssetInfo] = useState({
   name: '',
   price: 0
 })
  

  useEffect(() => {
    fetch(`https://rest.coinapi.io/v1/assets/${asset}?apikey=3DB0B8D6-BD54-4D47-9F9D-B276C963304E`)
    .then(res => res.json())
    .then(data => setAssetInfo({
      name: data[0].name,
      price: data[0].price_usd,
    }))
  })
  return (
    <div className="App">
     <h1>{assetInfo.name},{assetInfo.price}</h1>
    </div>
  );
}

export default App;
