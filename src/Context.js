import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider(props) {

    const [countries, setCountries] = useState([])
    const [suggestedCountries, setSuggestedCountries] = useState([])
    const [savedCountries, setSavedCountries] = useState([])

    const endpoint = 'https://restcountries.com/v3.1/all'

    useEffect(() => {
        fetch(endpoint)
            .then(res => res.json())
            .then(data =>
                setCountries(data))
                // setCountries(prev => prev.map((item, index) => ({ ...item, saved: false }))
                // )
    }, [])

// console.log(countries)

    function findCountries(input, countries) {

        const newCountries = countries.filter(item => {
            const word = input.toLowerCase()
            let matchArray = []
            item.capital && matchArray.push(item.capital.toString().toLowerCase().includes(word))
            item.name.common && matchArray.push(item.name.common.toLowerCase().includes(word))
            if (matchArray.some(item => item === true)) { return true }
        })

        setSuggestedCountries(newCountries)
    }

    function addToSaved(country) {
        setSavedCountries(prev => [...prev, country])
    }

    function removeFromSaved(country) {
        setSavedCountries(prev => prev.filter(e => e.name.common !== country.name.common))
    }


    return (
        <Context.Provider value={{
            countries,
            findCountries,
            suggestedCountries,
            savedCountries,
            removeFromSaved,
            addToSaved
        }}>
            {props.children}
        </Context.Provider>
    )
}


export { ContextProvider, Context }