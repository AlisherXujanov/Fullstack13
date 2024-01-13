import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation"
import About from "./components/About"
import NoPage from "./components/NoPage"

function AllComponents() {
    const location = useLocation();

    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigation />} >
                    <Route index element={<About />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default AllComponents;