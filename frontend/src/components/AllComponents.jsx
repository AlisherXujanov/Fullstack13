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
import HOC from "./HOC.jsx"
import Profile from "./Profile";
import Faq from "./Faq/index.jsx"
import ActivateAccount from "./account/ActivateAccount"
import ResetPassword from "./account/ResetPassword"
import ProductComments from "./Products/ProductComments";

const ControlledProducts = HOC(Products)
const ControlledProductDetails = HOC(ProductDetails)
const ControllProfile = HOC(Profile)
const ControlledProductComments = HOC(ProductComments)

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
                <Route path="products" element={<ControlledProducts />} />
                <Route path="comments/:id" element={<ControlledProductComments />} />
                <Route path="faq" element={<Faq />} />
                <Route path="products/:id" element={<ControlledProductDetails />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="profile" element={<ControllProfile/>}/>
                <Route path="*" element={<NoPage />} />


                <Route path="auth/users/activate/:uid/:token" element={<ActivateAccount />} />
                <Route path="auth/users/reset_password_confirm/:uid/:token" element={<ResetPassword />} />
            </Route>
        </Routes>
    );
}
export default AllComponents;