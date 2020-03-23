import React from 'react'
import './Searchbar.css'
const Searchbar = ()=>{
    return(
        <div className="serach-bar">
            <input type="text" placeholder="Search a movie...."/>
            <button>Search</button>
        </div>
    )
}

export default Searchbar