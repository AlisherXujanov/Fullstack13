import "./style.scss"
import Heading from "../common/Heading"
import ProductsInfo from "./ProductsInfo"
import { Link } from "react-router-dom"
import { useEffect, useContext } from 'react'
import { globalContext } from "../../store"
import ModalComponent from "../common/ModalComponent"
import ProductForm from "../common/ProductForm"


function Products() {
    const state = useContext(globalContext)

    useEffect(() => {
        document.title = "Products";
    }, [])

    function openModal(e) {
        state.dispatch({ type: "SET_SHOW_MODAL", payload: true })
    }
 
    return (
        <main className="products-page-wrapper">
            <Heading size={1.2}>Products</Heading>

            <button className="warning-btn create-btn" onClick={openModal}>Create new product</button>

            {state.showModal &&
                <div className="create-form-modal-wrapper">
                    <ModalComponent title="Create new product">
                        <ProductForm />
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
