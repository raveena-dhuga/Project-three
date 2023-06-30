import React from "react"
import { Link } from "react-router-dom"


function Nav () {
    return (
        <nav>
            <Link className="home-link" to="/">
                <h1> Travel List</h1>
            </Link>
            <Link to="/saved-destinations" className="destinations"> 
                <svg className="plane-icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                    <path d="m263-263 290-143 143-290-290 143-143 290Zm217-177q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17
                     0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 360q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83
                      31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 
                      155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 
                      99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/>
                </svg>
                <h3> Saved Destinations</h3>
            </Link>
            
        </nav>
    )
}

export default Nav 