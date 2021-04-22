import logo from './logo.svg';
import './styles/styles.css';
import {useEffect, useState} from 'react';
import Search from './Search'
import Asset from './Asset'
function App() {
  
 const [assets, setAssets] = useState([])

 useEffect(() => {
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false
  `)
  .then(res => res.json())
  .then(data => setAssets(data.map(asset => asset)));
 },[])
  

  const query = (asset) => {
    
  }
 
  //  const logoSearch = (input) => {
  //   fetch(`https://rest.coinapi.io/v1/assets/icons/40?apikey=3DB0B8D6-BD54-4D47-9F9D-B276C963304E`)
  //   .then(res => res.json())
  //   .then(data => setIcon(data.filter(asset => asset.asset_id == input)))
  //  }
   console.log(assets)
  return (
 
    <div className="page-container">
          <Search query={query}></Search>
          <Asset assets={assets}/>
    
        
 
    </div>
  )
}

export default App;
