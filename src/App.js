import React from "react"
import { Routes, Route } from "react-router-dom"
import MainPage from "./Pages/MainPage"
import TravelList from "./Pages/TravelList"
import Nav from "./Components/Nav"

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/travel-list" element={<TravelList />} />
            </Routes>
       </>     
    )
}

export default App

