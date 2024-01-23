import './style.scss'
import { useReducer } from 'react'
import { initialState, globalReducer } from '../../store'


function Products(props) {
    // const [count, setBemiyya] = useState(0)
    const [state, dispatch] = useReducer(globalReducer, initialState)

    // dispatch({....}) => globalReducer(initialState, {...})
    // state  =>  initialState

    // 3x3  =>  useState
    // 3x3  =>  useReducer

    function handleChange(e) {
        // e.target.value  ==  input
        const input_tag = e.target
        const key = input_tag.name
        const value = input_tag.value
        dispatch({
            type: key,
            value: value
        })
    }

    function handleCounter(e) {
        dispatch({type: e.target.name})
    }

    return (
        <div id="products-wrapper">
            <h2>Products</h2>

            <p>{state.text}</p>
            <p>{state.range}</p>
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

            <br />
            <br />
            <hr />
            <br />
            <br />


            <h3>{state.counter}</h3>

            <button className='warning-btn' name='decrement'
                onClick={handleCounter}
            >
                Decrement -
            </button>
            <button className='warning-btn' name='increment'
                onClick={handleCounter}
            >
                Increment +
            </button>


            {/* 
                DRY  =>  Don't Repeat Yourself
                Не Повторяйся
            */}
        </div>
    );
}

export default Products;
