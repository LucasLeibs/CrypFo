import React, {useState} from 'react';

export default function Search(props) {
 
  
   
    return (
       
          <form onSubmit={e => { e.preventDefault(); }}>
            <input placeholder="Search Cryptocurrency's" className="search-bar" onChange={(e) => props.search(e)}></input>
            
            </form>
      
    )
}
