import React, {useState} from 'react';

export default function Search(props) {
  const [input, setInput] = useState('')
    const search = (e) => {
      e.preventDefault();
      props.query(input)
    }
    console.log(input)
    return (
        <div>
          <form onSubmit={(e) => search(e)}>
            <input onChange={(e) => setInput(e.target.value)}></input>
            <button type="submit"> GO</button>
            </form>
        </div>
    )
}
