import './style.scss'
import { useReducer } from 'react'
import { initialState, globalReducer } from '../../store'


function Products(props) {
    // const [state, setState] = useState({})
    const [state, dispatch] = useReducer(globalReducer, initialState)

    // dispatch({....}) => globalReducer(initialState, {...})
    // state  =>  initialState

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
            {/* 
                DRY  =>  Don't Repeat Yourself
                Не Повторяйся
            */}
        </div>
    );
}

export default Products;
