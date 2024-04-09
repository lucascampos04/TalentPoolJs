import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "../pages/Home"
import { LoginPage } from "../pages/adm/login"

export const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>        
    )
}