import { useParams } from "react-router-dom"
import BlogJSON from "../../db/blog.json"
import { get_blog_img_index } from "../../store/helpers"
import Blog1 from "../../assets/images/blog-1.png"
import Blog2 from "../../assets/images/blog-2.png"
import Blog3 from "../../assets/images/blog-3.png"
import Blog4 from "../../assets/images/img1.png"
import Blog5 from "../../assets/images/img2.png"
import Blog6 from "../../assets/images/img3.png"
import "./details.scss"
import { useEffect } from 'react'

function Details() {
    const { id } = useParams()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
    
    const images = [Blog6, Blog1, Blog2, Blog3, Blog4, Blog5]
    const blog = BlogJSON.find(blog => blog.id === parseInt(id))
    const subtitle = blog.title.split(" ").slice(0, 3).join(" ")

    return (
        <div className="blog-details-wrapper">
            <p className="blog-page-name">Blog / {subtitle}</p>

            <h1>{blog.title}</h1>

            <h4 className="author">
                <span className="name">{blog.author}, </span>
                <span className="date">{blog.date}</span>
            </h4>

            <img 
                src={images[get_blog_img_index(blog.id, images.length)]} 
                alt="Blog-img" 
                width={"95%"}
            />

            <p className="subtitle-1">{blog.subtitle1}</p>
            <p className="subtitle-2">{blog.subtitle2}</p>
        </div>
    );
}

export default Details;