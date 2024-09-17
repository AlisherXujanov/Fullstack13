import "./style.scss"
import Heading from "../common/Heading"
import ProductsInfo from "./ProductsInfo"
import { Link } from "react-router-dom"
import { useEffect, useContext, useState } from 'react'
import { globalContext, BASE_URL } from "../../store"
import ModalComponent from "../common/ModalComponent"
import { toast } from "react-toastify"
import { fetchProducts } from "../../store/helpers.js"


function Products() {
    const state = useContext(globalContext)
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        owner: 1,
    })

    useEffect(() => {
        document.title = "Products";
    }, [])

    function openModal(e) {
        state.dispatch({ type: "SET_SHOW_MODAL", payload: true })
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
                    fetchProductsFn()
                })
        }
        catch (e) {
            console.log(e)
            toast.error("Error creating product")
        }
    }

    async function fetchProductsFn() {
        const data = await fetchProducts()
        state.dispatch({ type: "SET_PRODUCTS", payload: data })
    }

    function handleFormInfo(e) {
        const { value, name } = e.target

        if (name != 'image') {
            setForm({ ...form, [name]: value })
        } else {
            let file = e.target.files[0]
            setForm({ ...form, [name]: file })
        }
    }

    return (
        <main className="products-page-wrapper">
            <Heading size={1.2}>Products</Heading>

            <button className="warning-btn create-btn" onClick={openModal}>Create new product</button>


            {state.showModal &&
                <div className="create-form-modal-wrapper">
                    <ModalComponent title="Create new product">
                        <form onSubmit={submit}>
                            <div className="form-control">
                                <label htmlFor="prod-name">Name of the product</label>
                                <input id="prod-name" type="text" placeholder="Name" name='name' onChange={handleFormInfo} required />
                            </div>
                            <div className="form-control">
                                <label htmlFor="prod-price">Price of the product</label>
                                <input id="prod-price" type="number" placeholder="Price" name='price' onChange={handleFormInfo} required />
                            </div>
                            <div className="form-control">
                                <label htmlFor="prod-image">Image of the product</label>
                                <input id="prod-image" type="file" name='image' onChange={handleFormInfo} required />
                            </div>
                            <div className="form-control">
                                <label htmlFor="prod-desc">Description of the product</label>
                                <textarea rows={5} name="description" id="prod-desc" placeholder="Description" onChange={handleFormInfo}></textarea>
                            </div>
                            <div className="form-control">
                                <button type="submit" className="warning-btn">
                                    Create product
                                </button>
                            </div>
                        </form>
                    </ModalComponent>
                </div>
            }


            <div className="component-wrapper">
                {state.products &&
                    state.products.length > 0 ?
                    state.products.map((product, index) => {
                        return (
                            <div key={index}>
                                <ProductsInfo image={product.image}>
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <Link to={"/products/" + product.id} className="products-info">
                                        <button className="warning-btn">Подробнее</button>
                                    </Link>
                                </ProductsInfo>
                            </div>
                        )
                    })
                    : <h2>Нет продуктов</h2>
                }
            </div>
            <h2>
                <span>*</span> в процессе регистрации
            </h2>
        </main>
    );
}

export default Products;
