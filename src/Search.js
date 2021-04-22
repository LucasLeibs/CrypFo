import React, {useState} from 'react';

export default function Search(props) {
 
  
   
    return (
        <div>
          <form>
            <input className="search-bar" onChange={(e) => props.search(e)}></input>
            
            </form>
        </div>
    )
}
