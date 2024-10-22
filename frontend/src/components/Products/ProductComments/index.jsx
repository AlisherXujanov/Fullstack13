import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from 'react'
import { BASE_URL, BASE_AUTH_URL, globalContext } from "../../../store";
import Heading from "../../common/Heading";
import "./style.scss"
import axios from "axios";

function ProductComments() {
    const state = useContext(globalContext)
    const [product, setProduct] = useState([])
    const [owners, setOwners] = useState([])
    const { id } = useParams()

    useEffect(() => {
        let result = state.products?.find(p => p.id === parseInt(id))
        setProduct(result)
        if (product && result && result.related_comments?.length > 0) {
            getProfiles()
        }
    }, [state.products])

    async function getProfiles() {
        let ids_set = new Set()
        product?.related_comments?.forEach(comm => {
            ids_set.add(comm.user_profile)
        })
        const TOKEN = localStorage.getItem("token")
        const data = JSON.stringify({ profiles: Array.from(ids_set) })
        let response = await axios.post(BASE_AUTH_URL + "users/profile", data, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        })
        if (response.status === 200) {
            console.log(response.data?.profiles)
            setOwners(response.data?.profiles)
        }
        return false
    }

    function getOwnerImage(user_profile) {
        let profile = owners.find(p => p.id === user_profile)
        const imageURL = BASE_URL + profile?.image.slice(1)
        return imageURL
    }


    return (
        <div className="comments-page-wrapper">
            <Heading size={1.2}>Comments of {product?.name}</Heading>

            <div className="all-related-comments">
                {product && product.related_comments?.map((comm, index) => {
                    return (
                        <div className="comment-item" key={index}>
                            <p>
                                {
                                    comm.user_profile && getOwnerImage(comm.user_profile) &&
                                    <img className="owner-image" src={getOwnerImage(comm.user_profile)} />
                                }
                                <span className="comment-text">{comm.content}</span>
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ProductComments;