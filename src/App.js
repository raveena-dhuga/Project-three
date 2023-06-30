import React from "react"
import { Routes, Route } from "react-router-dom"
import MainPage from "./Pages/MainPage"
import SavedDestinations from "./Pages/SavedDestinations"
import Nav from "./Components/Nav"

function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/saved-destinations" element={<SavedDestinations />} />
            </Routes>
       </div>     
    )
}

export default App

