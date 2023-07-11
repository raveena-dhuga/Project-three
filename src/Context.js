import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider(props) {

    const [countries, setCountries] = useState([])
    const [suggestedCountries, setSuggestedCountries] = useState([])
    const [saved, setSaved] = useState(JSON.parse(localStorage.getItem('saved')) || [])
    const [renderList, setRenderList] = useState()
    const [lastCheckedItem, setLastCheckedItem] = useState()
    const [checkedItems, setCheckedItems] = useState([])

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


    function handleOnChange(index, e) {
        setCheckedItems(updateCheckedItems(index, e))
        setLastCheckedItem(index)
    }

    function getNewCheckedItems(index, e) {
        let indexArray = []
        saved.forEach((item, index) => indexArray.push(index))
        const newArray = indexArray.slice(
            Math.min(lastCheckedItem, index),
            Math.max(lastCheckedItem, index) + 1
        )
        return newArray
    }

    function updateCheckedItems(index, e) {
        const hasBeenChecked = checkedItems.includes(index);

        if (e.nativeEvent.shiftKey) {
            const newCheckedItems = getNewCheckedItems(index, e)
            const selections = [...new Set([...checkedItems, ...newCheckedItems])]
            if (hasBeenChecked) {
                return selections.filter(item => !newCheckedItems.includes(item))
            }
            return selections
        }

        return checkedItems.includes(index)
            ? checkedItems.filter(item => item !== index)
            : [...checkedItems, index]

    }

    function removeFromSaved() {
        const savedArray = saved.map(item => {
            const countryInfo = countries.filter(y => y.name.common === item)
            return countryInfo[0]
        }).map(item => item.name.common.toString())

        const selectedToDelete = checkedItems.map(item => savedArray[item])
        const updatedSaved = savedArray.filter((item) => !selectedToDelete.includes(item))

        localStorage.setItem('saved', JSON.stringify(updatedSaved))
        setSaved(updatedSaved)
        setLastCheckedItem()
        setCheckedItems([])
    }


    return (
        <Context.Provider value={{
            countries,
            findCountries,
            suggestedCountries,
            setSuggestedCountries,
            updatingSaved,
            saved,
            renderList,
            setRenderList,
            handleOnChange,
            checkedItems,
            removeFromSaved,
            setCheckedItems
        }}>
            {props.children}
        </Context.Provider>
    )
}


export { ContextProvider, Context }