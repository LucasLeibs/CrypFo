import React, {useState} from 'react';

export default function Search(props) {
 
  
   
    return (
       
          <form onSubmit={e => { e.preventDefault(); }}>
            <input placeholder="Search" className="search-bar" onChange={(e) => props.search(e)}></input>
            
            </form>
      
    )
}
