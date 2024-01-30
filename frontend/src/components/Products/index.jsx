import './style.scss'
import { useContext } from "react"
import { context } from "../../store"

function Products(props) {
    const { store, setStore } = useContext(context)

    return (
        <div id="products-wrapper">
            <h2>Products</h2>
            <h3>{ store.count }</h3>
            <button className='warning-btn' onClick={(e) => { setStore({type: 'increment'}) }}>
                Increment
            </button>
        </div>
    );
}

export default Products;
