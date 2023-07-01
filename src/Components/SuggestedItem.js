import React, { useContext } from "react"
import reactStringReplace from 'react-string-replace'
import { Context } from "../Context"
import { v4 as uuidv4 } from 'uuid'


function SuggestedItem({ country, input }) {

    const {saved, updatingSaved} = useContext(Context)

    const countryName = country.name.common && reactStringReplace(country.name.common.toString(), input, (input) => (
        <span key={uuidv4()} className="bold">{input}</span>
    ));
    const capitalName = country.capital && reactStringReplace(country.capital.join(", ").toString(), input, (input) => (
        <span key={uuidv4()} className="bold">{input}</span>
    ));


    return (
        <div className="suggested-item">
            <input 
                className="checkbox" 
                type="checkbox" 
                checked ={saved.includes(country.name.common.toString())} onChange={()=> updatingSaved(country)}
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
        </div>
    )
}

export default SuggestedItem

