import "./style.scss"
import { useContext, useState, useEffect } from 'react'
import { globalContext, BASE_URL } from "../../../store"
import { toast } from "react-toastify"


function ProductForm(props) {
    // REQUIRES:
    // fetchFunction:  is called after the product is created


    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        owner: 1,
    })
    const state = useContext(globalContext)

    // useEffect(() => {
    //     // if (props.updateMode == true) {
    //     //     setForm({
    //     //         name: props.product.name,
    //     //         price: props.product.price,
    //     //         description: props.product.description,
    //     //         image: "",
    //     //         owner: 1,
    //     //     })
    //     // }
    // }, [])


    async function submit(e) {
        e.preventDefault()

        let formData = new FormData()
        formData.append("name", form.name)
        formData.append("price", form.price)
        formData.append("description", form.description)
        formData.append("image", form.image)
        formData.append("owner", form.owner)

        try {
            fetch(BASE_URL + "products", {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    toast.success("Product created successfully")
                    state.dispatch({ type: "SET_SHOW_MODAL", payload: false })
                    setForm({
                        name: "",
                        price: "",
                        description: "",
                        image: "",
                        owner: 1,
                    })
                    if (props.fetchFunction) {
                        props.fetchFunction()
                    }
                })
        }
        catch (e) {
            console.log(e)
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

            const imageWrapper = document.querySelector(".form-control .image-wrapper")
            imageWrapper.innerHTML = ""
            const imageURL = URL.createObjectURL(file)
            const imageTag = document.createElement("img")
            imageTag.src = imageURL
            imageTag.alt = "Product image cound not be loaded"
            imageWrapper.appendChild(imageTag)
            imageTag.addEventListener('click', (e) => {
                e.target.remove()
                setForm({ ...form, "image": "" })
            })
        }
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="prod-name">Name of the product</label>
                    <input id="prod-name" type="text" placeholder="Name" name='name' onChange={handleFormInfo} required />
                </div>
                <div className="form-control">
                    <label htmlFor="prod-price">Price of the product</label>
                    <input id="prod-price" type="number" placeholder="Price" name='price' onChange={handleFormInfo} required />
                </div>
                <div className={form.image ? "form-control row" : "form-control"}>
                    <div>
                        <label htmlFor="prod-image">Image of the product</label>
                        <input id="prod-image" type="file" name='image' onChange={handleFormInfo} required />
                    </div>
                    {
                        <div className="image-wrapper">
                        </div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="prod-desc">Description of the product</label>
                    <textarea rows={5} name="description" id="prod-desc" placeholder="Description" onChange={handleFormInfo} required></textarea>
                </div>
                <div className="form-control">
                    <button type="submit" className="warning-btn">
                        { props.updateMode ? "Update" : "Create" } product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;