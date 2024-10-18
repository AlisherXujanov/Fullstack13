import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from 'react'
import { BASE_AUTH_URL, globalContext } from "../../../store";
import Heading from "../../common/Heading";
import "./style.scss"
import axios from "axios";

function ProductComments() {
    const state = useContext(globalContext)
    const [product, setProduct] = useState([])
    const { id } = useParams()

    useEffect(() => {
        let result = state.products?.find(p => p.id === parseInt(id))
        setProduct(result)
        getProfiles()
    }, [state])


    async function getProfiles() {
        let ids_set = new Set()
        product?.related_comments?.forEach(comm => {
            ids_set.add(comm.user_profile)
        })
        const TOKEN = localStorage.getItem("token")
        const data = JSON.stringify({ profiles: ids_set })
        let response = await axios.post(BASE_AUTH_URL + "users/profile", data, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        })
        console.log(response)
        if (response.status === 200) {
            return response.data
        }
        return false
    }


    return (
        <div className="comments-page-wrapper">
            <Heading size={1.2}>Comments of {product?.name}</Heading>

            {product && product.related_comments?.map((comm, index) => {
                return (
                    <div key={index}>
                        <h2>{comm.content}</h2>
                    </div>
                )
            })}
        </div>
    );
}

export default ProductComments;