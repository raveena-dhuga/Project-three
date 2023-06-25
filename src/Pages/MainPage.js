import React, { useContext } from "react"
import { Context } from "../Context"
import SuggestedItem from "../Components/SuggestedItem"
import { v4 as uuidv4 } from 'uuid'

function MainPage() {

    const searchInput = document.querySelector('.searchbar')
    const { countries, findCountries, suggestedCountries } = useContext(Context)

    const suggestedItemElements = suggestedCountries.map((item) =>
        (<SuggestedItem key={uuidv4()} country={item} input={searchInput.value} />))

    return (
        <div className="main-container">
            <input
                type="text"
                placeholder="Capital or Country Name"
                className="searchbar"
                onChange={() => { findCountries(searchInput.value, countries) }}
                onKeyUp={() => { findCountries(searchInput.value, countries) }}
            />
            <div className="suggested-container">
                {suggestedItemElements && suggestedItemElements}
            </div>
        </div>
    )

}

export default MainPage