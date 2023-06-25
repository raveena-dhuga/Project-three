import React, { useContext, useState } from "react"
import reactStringReplace from 'react-string-replace'
import { Context } from "../Context"
import { v4 as uuidv4 } from 'uuid'

function SuggestedItem({ country, input }) {

    const { addToSaved, savedCountries, removeFromSaved } = useContext(Context)

    const countryName = country.name.common && reactStringReplace(country.name.common.toString(), input, (input) => (
        <span key={uuidv4()} className="bold">{input}</span>
    ));
    const capitalName = country.capital && reactStringReplace(country.capital.toString(), input, (input) => (
        <span key={uuidv4()} className="bold">{input}</span>
    ));

    function checkedIcon() {
        if (savedCountries.filter(e => e.name.common === country.name.common).length > 0) {
            return <div className="check" onClick={() => removeFromSaved(country)}></div>
        } else { return <div className="uncheck" onClick={() => addToSaved(country)}></div> }
    }


    return (
        <div className="suggested-item">
            {checkedIcon()}
            <div> {countryName}</div>
            <div>{capitalName}</div>
            <div> {country.languages && Object.values(country.languages).join(', ')}</div>
            <div> {country.currencies && Object.keys(country.currencies).join(', ')}</div>
        </div>
    )
}

export default SuggestedItem

