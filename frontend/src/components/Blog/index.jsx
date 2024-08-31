import './style.scss'
import Heading from '../common/Heading'
import blogJson from '../../db/blog.json'
import Item from './Item.jsx';
import { useEffect } from 'react'

function Blog(props) {
    useEffect(() => {
        document.title = "Blog";
    }, []);

    return (
        <div className="blog-page-wrapper">
            <Heading size={1}>Blog</Heading>


            {
                blogJson.map((item, index) => {
                    return (
                        <div key={index} className="item-wrapper">
                            <Item item={item} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Blog