import './style.scss'
import { useState } from 'react'

function Products(props) {
    const [counter, setCounter] = useState(0)

    return (
        <div id="products-wrapper">
            <h2>Products</h2>

            <hr />
            <br />
            <h2>{counter}</h2>
            <button 
                className='warning-btn'
                onClick={(e) => { setCounter(counter-1) }}
            >
                Click me!
            </button>
            <br />
            <hr />
            <input type="text" />
        </div>
    );
}

export default Products;
