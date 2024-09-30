import "./style.scss"
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { globalContext, BASE_URL } from "../../../store"
import { toast } from "react-toastify"
import { fetchProducts, getTokenFromLS } from "../../../store/helpers.js"

function ProductForm(props) {
    const navigate = useNavigate()
    const state = useContext(globalContext)
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        owner: state.profile.user.id,
    })

    useEffect(() => {
        if (props.updateMode == true) {
            setForm({
                name: props.product.name,
                price: props.product.price,
                description: props.product.description,
                owner: props.product.owner,
            })
        }
        presetImageIfUpdateMode()
    }, [])


    async function fetchProductsFn() {
        const data = await fetchProducts()
        state.dispatch({ type: "SET_PRODUCTS", payload: data })
        navigate("/products")
    }

    async function submit(e) {
        e.preventDefault()

        let formData = new FormData()
        formData.append("name", form.name)
        formData.append("price", form.price)
        formData.append("description", form.description)
        formData.append("image", form.image)
        formData.append("owner", form.owner)

        try {
            let FETCH_METHOD = null
            let URL = null
            let success_message = ""

            if (props.updateMode) {
                FETCH_METHOD = "PUT"
                URL = `${BASE_URL}products/${props.product.id}/`
                success_message = "Product updated successfully"
            } else {
                FETCH_METHOD = "POST"
                URL = BASE_URL + "products"
                success_message = "Product created successfully"
            }

            fetch(URL, { 
                method: FETCH_METHOD, 
                headers: {
                    Authorization: "Token " + getTokenFromLS()
                },
                body: formData 
            })
                .then(res => res.json())
                .then(data => {
                    toast.success(success_message)
                    state.dispatch({ type: "SET_SHOW_MODAL", payload: false })
                    setForm({
                        name: "",
                        price: "",
                        description: "",
                        image: "",
                        owner: 1,
                    })
                    fetchProductsFn()
                })
        }
        catch (e) {
            toast.error("Error creating product")
        }
    }
    
    function handleFormInfo(e) {
        const { value, name } = e.target

        if (name != 'image') {
            setForm({ ...form, [name]: value })
        } else {
            let file = e.target.files[0]
            setForm({ ...form, [name]: file })
            const imageURL = URL.createObjectURL(file)
            setImage(imageURL)
        }
    }

    function setImage(imageURL) {
        const imageWrapper = document.querySelector(".form-control .image-wrapper")
            imageWrapper.innerHTML = ""
            const imageTag = document.createElement("img")
            imageTag.src = imageURL
            imageTag.alt = "Product image cound not be loaded"
            imageWrapper.appendChild(imageTag)

            const fileInput = document.querySelector('input[type="file"]')
            imageTag.addEventListener('click', (e) => {
                e.target.remove()
                fileInput.value = ""
                setForm({ ...form, "image": "" })
            })
    }


    function presetImageIfUpdateMode() {
        if (props.updateMode) {
            setImage(props.product.image)
        }
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="prod-name">Name of the product</label>
                    <input id="prod-name" type="text"
                        placeholder="Name" name='name'
                        onChange={handleFormInfo}
                        value={form.name}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="prod-price">Price of the product</label>
                    <input id="prod-price" type="number"
                        placeholder="Price" name='price'
                        onChange={handleFormInfo}
                        value={form.price}
                        required
                    />
                </div>
                <div className={form.image || props.product.image ? "form-control row" : "form-control"}>
                    <div>
                        <label htmlFor="prod-image">Image of the product</label>
                        <input id="prod-image" type="file"
                            name='image'
                            onChange={handleFormInfo}
                            required
                        />
                    </div>
                    {
                        <div className="image-wrapper">
                        </div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="prod-desc">Description of the product</label>
                    <textarea
                        id="prod-desc"
                        rows={5}
                        name="description"
                        placeholder="Description"
                        onChange={handleFormInfo}
                        value={form.description}
                        required
                    ></textarea>
                </div>
                <div className="form-control">
                    <button type="submit" className="warning-btn">
                        {props.updateMode ? "Update" : "Create"} product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;