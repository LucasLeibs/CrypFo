import logo from './logo.svg';
import './styles/styles.css';
import {useEffect, useState} from 'react';
import Search from './Search'
import Asset from './Asset'
function App() {
  
 const [assets, setAssets] = useState([])
const [filterAssets, setFilterAssets] = useState([])
const [input, setSearch] = useState('')
 useEffect(() => {
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false
  `)
  .then(res => res.json())
  .then(data => {
    setAssets(data.map(asset => asset))
    setFilterAssets(data.map(asset => asset))
  } 
  );
 },[])
  

 const search = (e) => {
   setSearch(e.target.value)

}
 const filteredCoins = assets.filter(asset => asset.id.includes(input))
  //  const logoSearch = (input) => {
  //   fetch(`https://rest.coinapi.io/v1/assets/icons/40?apikey=3DB0B8D6-BD54-4D47-9F9D-B276C963304E`)
  //   .then(res => res.json())
  //   .then(data => setIcon(data.filter(asset => asset.asset_id == input)))
  //  }
   console.log(assets)
  return (
 
    <div className="page-container">
          <Search search={search} assets={assets}></Search>
          <Asset filterAssets={filteredCoins} assets={assets}/>
    
        
 
    </div>
  )
}

export default App;
