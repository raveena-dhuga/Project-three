import React, { useContext, useEffect, useState, useRef } from "react"
import SavedItem from "../Components/SavedItem"
import { Context } from "../Context"


function SavedDestinations() {

    const { saved, countries } = useContext(Context)
    const [hovered, setHovered] = useState(false)
    const ref = useRef(null)

    const savedArray = countries.filter(item => saved.includes(item.name.common.toString()))

    const savedItemElements = savedArray.map((item, index) =>
        (<SavedItem key={index} country={item} index={index} name={item.name.common} />))

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("mouseover", () => { setHovered(true) })
            ref.current.addEventListener("mouseleave", () => { setHovered(false) })
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener("mouseenter", () => { setHovered(true) });
                ref.current.removeEventListener("mouseleave", () => { setHovered(false) });
            }
        }
    }, [])


    const trashIcon = hovered ?
        <svg className="trash" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
            <path d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 
            121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0
             24-18 42t-42 18H261Z" />
        </svg>
        : 
        <svg className="trash" ref={ref} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
            <path d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 
                    121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0
                    24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z"/>
        </svg>


    return (
        <div>
            <div className="trash-container">
                <p>Delete Selected</p>
                {trashIcon}
            </div>
            <ul className="saved-container">
                <div className="saved-item header">
                    <div>Visited <p> Shift to select multiple</p></div>
                    <div className="flag responsive-grid-item-2">Flag</div>
                    <div> Country Name</div>
                    <div>  Capital</div>
                    <div className="responsive-grid-item-1"> Languages </div>
                    <div className="responsive-grid-item-1"> Currencies</div>
                </div>
                {savedItemElements}
            </ul>
        </div>
    )
}

export default SavedDestinations