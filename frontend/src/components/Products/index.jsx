import './style.scss'
import { useReducer } from 'react'
import { initialState, globalReducer } from '../../store'
import { useState } from 'react'

function Products(props) {
    const [color, setColor] = useState('red')
    const [thisColor, setThisColor] = useState('snow')
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
        dispatch({ type: e.target.name })
    }
    function changeColor(e) {
        let colors = [
            "red", "green", "blue", "yellow",
            "purple", "orange", "pink", "brown",
            'black', 'white', 'gray', 'cyan',
            'magenta', 'lime', 'olive', 'maroon',
        ]
        let random_index = Math.floor(Math.random() * colors.length)
        setColor(colors[random_index])
    }
    function handleSetThisColor(e) {
        // setThisColor(e.target.value)
        dispatch({type:"thisColorType",    inputColor:e.target.value})
    }
    function changeOpacity(e) {
        dispatch({
            type: "thisOpacityType",
            inputOpacity: e.target.value
        })
    }

    return (
        <div id="products-wrapper">
            <h2>Products</h2>
            <br />
            <br />

            <div className="container">
                <input type="range" min={20} step={5} onChange={changeOpacity} />
                <p style={{opacity:state.thisOpacity+"%"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium minima ex mollitia iste, impedit reiciendis soluta consequatur explicabo culpa nostrum dolorum! Explicabo temporibus maiores vel porro ullam quia beatae!</p>
            </div>

            <div className="container">
                <div style={{fontSize: state.fontSize+"px",  color:state.thisColor}}>
                    <button className="warning-btn" onClick={() => {
                            dispatch({type: 'text_bigger'})
                        }}
                    >
                        Make text bigger
                    </button>

                    <input type="color" onChange={handleSetThisColor} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam molestias recusandae veritatis quas ipsum animi necessitatibus? Tempora doloribus sed repellendus neque maiores ea dolore ab quam, alias totam nobis voluptate?</p>
                </div>
            </div>

            <div className="container">
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
            </div>

            <div className="container">
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
            </div>

            <div className="container">
                <div style={{color:color}}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reprehenderit debitis, rerum fuga ad doloremque est sequi deleniti animi corporis nihil adipisci praesentium ab exercitationem alias inventore itaque commodi odio.</p>
                    <button onClick={changeColor} className="warning-btn">
                        Change color
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Products;
