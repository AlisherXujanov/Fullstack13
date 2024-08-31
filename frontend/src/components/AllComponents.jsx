import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./Navigation"
import NoPage from "./NoPage"
import LandingPage from './LandingPage'
import About from './About'
import Team from './Team'
import Blog from './Blog'
import Products from './Products'
import ProductDetails from './Products/ProductDetails.jsx'
import Contacts from './Contacts'
import BlogDetails from "./Blog/BlogDetails";

function AllComponents() {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigation />} >
                <Route index element={<LandingPage />} />
                <Route path="about" element={<About />} />
                <Route path="team" element={<Team />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogDetails />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductDetails />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}
export default AllComponents;