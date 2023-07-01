import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider(props) {

    const [countries, setCountries] = useState([])
    const [suggestedCountries, setSuggestedCountries] = useState([])
    const [saved, setSaved] = useState(JSON.parse(localStorage.getItem('saved')) || [])
    const [checkedState, setCheckedState] = useState(new Array(saved.length).fill(false))
    const [lastChecked, setLastChecked] = useState()
    const [renderList, setRenderList] = useState()

    const endpoint = 'https://restcountries.com/v3.1/all'

    useEffect(() => {
        fetch(endpoint)
            .then(res => res.json())
            .then(data =>
                setCountries(data))
        // setCountries(prev => prev.map((item, index) => ({ ...item, saved: false }))
        // )
    }, [])

    function findCountries(input, countries) {

        const newCountries = countries.filter(item => {
            const word = input.toLowerCase()
            let matchArray = []
            item.capital && matchArray.push(item.capital.join(", ").toString().toLowerCase().includes(word))
            item.name.common && matchArray.push(item.name.common.toLowerCase().includes(word))
            if (matchArray.some(item => item === true)) { return true }
        })
        setRenderList(true)
        setSuggestedCountries(newCountries)
    }


    function updatingSaved(country) {

        if (saved.includes(country.name.common.toString())) {
            const reducedList = saved.filter(item => item !== country.name.common)
            localStorage.setItem('saved', JSON.stringify(reducedList))
            const y = JSON.parse(localStorage.getItem('saved'))
            setSaved(y)

        } else {
            const increasedList = [...saved, country.name.common.toString()]
            localStorage.setItem('saved', JSON.stringify(increasedList))
            const x = JSON.parse(localStorage.getItem('saved'))
            setSaved(x)
        }
    }


    // Saved Destinations page


    function handleOnChange(position, e) {
        let updatedCheckedState

        if (e.nativeEvent.shiftKey && e.target.checked) {
            let indexArray = []
            saved.forEach((item, index) => indexArray.push(index))
            const newArray = indexArray.slice(
                Math.min(lastChecked, Number(e.target.id)),
                Math.max(lastChecked, Number(e.target.id) + 1)
            )
            updatedCheckedState = checkedState.map((k, index) => {
                return newArray.includes(index) ? true : k
            })
        } else {
            updatedCheckedState = checkedState.map((item, index) =>
                index === position ? !item : item
            )
        }

        setCheckedState(updatedCheckedState);
        setLastChecked(position)
    }

    return (
        <Context.Provider value={{
            countries,
            findCountries,
            suggestedCountries,
            setSuggestedCountries,
            updatingSaved,
            saved,
            setCheckedState,
            handleOnChange,
            checkedState, 
            renderList, 
            setRenderList
        }}>
            {props.children}
        </Context.Provider>
    )
}


export { ContextProvider, Context }