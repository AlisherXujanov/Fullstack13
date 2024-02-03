import { useParams } from "react-router-dom"
import "./details.scss"
import BlogJSON from "../../db/blog.json"

function Details() {
    const { id } = useParams()

    const blog = BlogJSON.find(blog => blog.id === parseInt(id))
    const subtitle = blog.title.split(" ").slice(0, 3).join(" ")

    return (
        <div className="blog-details-wrapper">
            <p>Blog / {subtitle}</p>

            <h1>{blog.title}</h1>
        </div>
    );
}

export default Details;