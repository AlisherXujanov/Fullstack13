import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import About from './About'
import NoPage from './NoPage'
import Blog from './Blog'
import Contacts from './Contacts'

function AllComponents(props) {
    const location = useLocation()
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigation />} >
                <Route index element={<About />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}

export default AllComponents;