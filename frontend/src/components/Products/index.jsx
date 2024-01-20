import './style.scss'
import { useState } from 'react'

function Products(props) {
    const [counter, setCounter] = useState(0)
    const [input, setInput] = useState({
        text: "",
        range: 0
    })

    function handleChange(e) {
        // e.target.value  ==  input
        const input_tag = e.target
        const key = input_tag.name
        const value = input_tag.value
        setInput({...input, [key]:value})
        // {
            // text: "",
            // range: 0,
            // range: 123  =>  This remains
        // }
    }

    return (
        <div id="products-wrapper">
            <h2>Products</h2>

            <hr />
            <br />
            <h2>{counter}</h2>
            <button className='warning-btn'
                onClick={(ev) => { setCounter(counter-1) }}
            >
                Decrement
            </button>
            <button className='warning-btn'
                onClick={(e) => { setCounter(counter+1) }}
            >
                Increment
            </button>
            <br />
            <hr />
            <br />
            <br />
            <p>{input.text}</p>
            <p>{input.range}</p>
            <input 
                type="text" 
                onChange={handleChange}
                name="text"
            />
            <input 
                type="range" 
                onChange={handleChange}
                name="range"
            />
            {/* 
                DRY  =>  Don't Repeat Yourself
                Не Повторяйся
            */}
        </div>
    );
}

export default Products;
