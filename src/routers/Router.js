import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "../pages/Home"


export const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>        
    )
}