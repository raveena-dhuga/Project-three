import React, { useContext, useState } from "react"
import { Context } from "../Context"
import SuggestedItem from "../Components/SuggestedItem"
import { v4 as uuidv4 } from 'uuid'

function MainPage() {

    const { countries, findCountries, suggestedCountries, setSuggestedCountries } = useContext(Context)
    const [input, setInput] = useState("")

    const suggestedItemElements = suggestedCountries.map((item) =>
        (<SuggestedItem key={uuidv4()} country={item} input={input} />))

    function emptyList(e) {
        if (e.target.value.length === 0) {
            setSuggestedCountries([])
        }
    }


    return (
        <div className="main-container">
            <div className="searchbar-container">
                <input
                    type="text"
                    value={input}
                    placeholder="Search by Country Name or Capital"
                    className="searchbar"
                    onChange={(e) => { findCountries(input, countries); setInput(e.target.value) }}
                    onKeyUp={(e) => { setInput(e.target.value); findCountries(input, countries); emptyList(e) }}
                />
                <button className="clear-input" onClick={() => { setSuggestedCountries([]); setInput("") }}>x</button>
            </div>
            <div className="suggested-container">
                <div className="suggested-item header">
                    <div>Add to Saved</div>
                    <div className="flag responsive-grid-item">Flag</div>
                    <div> Country Name</div>
                    <div>  Capital</div>
                    <div className="responsive-grid-item"> Languages </div>
                    <div className="responsive-grid-item"> Currencies</div>
                </div>
                {suggestedItemElements && suggestedItemElements}
            </div>
        </div>
    )

}

export default MainPage