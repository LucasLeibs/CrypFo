// import logo from './logo.svg';
import './styles/styles.css';
import {useEffect, useState} from 'react';
import Search from './Search'
import Asset from './Asset'
import moment from 'moment';
import logo from './block.png'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Chart from './Chart';

const clock = <svg xmlns="http://www.w3.org/2000/svg" id="clock" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
function App() {
  
 const [assets, setAssets] = useState([])
const [filterAssets, setFilterAssets] = useState([])
const [input, setSearch] = useState('')
const [time, setTime] = useState(moment().format('LTS'))
 useEffect(() => {
 const fetchData = () =>{ 
   fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true
  `)
  .then(res => res.json())
  .then(data => {
    setAssets(data.map(asset => asset))
    
  } 
  )};
  fetchData()
 },[])
  

 const search = (e) => {
   e.preventDefault()
   setSearch(e.target.value)

}

// const update = () => {
// setTime(moment().format('LTS'))
// }
// setInterval(update,1000)

 const filteredCoins = assets.filter(asset => asset.id.toLowerCase().includes(input.toLowerCase()))
  //  const logoSearch = (input) => {
  //   fetch(`https://rest.coinapi.io/v1/assets/icons/40?apikey=3DB0B8D6-BD54-4D47-9F9D-B276C963304E`)
  //   .then(res => res.json())
  //   .then(data => setIcon(data.filter(asset => asset.asset_id == input)))
  //  }
  
  return (
    <Router>
    <div className="page-container">
     
   
  <Switch>
          <Route 
         exact
          path="/">
      {/* <p className="time">{time}</p>
     <p>{clock}</p> */}
      <img className="logo"src={logo}></img>
          <Search search={search} assets={assets}></Search>
          <Asset filterAssets={filteredCoins} assets={assets}/>
          </Route>
          <Route exact path="/charts/:asset">
           <Chart/>
          </Route>
          </Switch>
    </div>
    </Router>
  )
}

export default App;
