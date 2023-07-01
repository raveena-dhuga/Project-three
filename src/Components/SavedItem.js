import React, { useContext } from "react"
import { Context } from "../Context"

function SavedItem({ country, name, index }) {

    const { checkedState, handleOnChange } = useContext(Context)

    const countryName = country.name.common
    const capitalName = country.capital.join(", ")

    return (

        <li key={index} className="saved-item">
            <input
                className="checkbox"
                type="checkbox"
                id={index}
                name={name}
                value={name}
                checked={checkedState[index]}
                onChange={(e) => handleOnChange(index, e)}
            />
            <img className="flag responsive-grid-item-2" src={country.flags.png} />
            <div> {countryName}</div>
            <div>{capitalName}</div>
            <div className="responsive-grid-item-1">
                {country.languages && Object.values(country.languages).join(', ')}
            </div>
            <div className="responsive-grid-item-1">
                {country.currencies && Object.keys(country.currencies).join(', ')}
            </div>
        </li>
    )
}

export default SavedItem

