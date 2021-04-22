import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Search from './Search'

function App() {
  
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
 
   const logoSearch = (input) => {
    fetch(`https://rest.coinapi.io/v1/assets/icons/50?apikey=3DB0B8D6-BD54-4D47-9F9D-B276C963304E`)
    .then(res => res.json())
    .then(data => setIcon(data.filter(asset => asset.asset_id == input)))
   }
   
  return (
 
    <div className="App">
     <h1>{assetInfo.name},{assetInfo.price}</h1>
     <img src={icon[0].url}></img>
     <Search logoSearch={logoSearch} query={query}></Search>
    </div>
  )
}

export default App;
