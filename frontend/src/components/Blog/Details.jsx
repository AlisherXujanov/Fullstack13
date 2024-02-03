import { useParams } from "react-router-dom"
import "./details.scss"

function Details() {
    const { id } = useParams()

    return (
        <div className="blog-details-wrapper">
            <h1>Details</h1>
            {String(id)}
        </div>
    );
}

export default Details;