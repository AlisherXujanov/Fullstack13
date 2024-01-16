import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./Navigation"
import About from "./About"
import NoPage from "./NoPage"
import Products from "./Products"

function AllComponents() {
    const location = useLocation();
    return (
        <>
            {/* 
                http://localhost:3000/ 
            */}
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigation />} >
                    <Route index element={<About />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
}
export default AllComponents;