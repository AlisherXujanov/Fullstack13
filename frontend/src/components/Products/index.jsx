import "./style.scss"
import Heading from "../common/Heading"
import { useState } from 'react'

// 1. Always, import a hook from 'react' package
// RU: Всегда импортируйте хук из пакета 'react'
// 2. Always, initialize a hook in top level of a component
// RU: Всегда инициализируйте хук в верхнем уровне компонента

function Products() {
    const [state, setState] = useState({
        counter: 0,
        color: 'red',
        name: 'Vasya'
    })

    function inc(e) {
        setState({ ...state, counter: state.counter + 1 })
    }
    function dec(e) {
        const names = ['Alijon', "Onur", "Bemiyya", "Valodya"]
        const colors = ['red', 'green', 'blue', 'yellow']
        const randomNumber = Math.floor(Math.random() * names.length)

        setState({
            counter: state.counter - 1,
            color: colors[randomNumber],
            name: names[randomNumber]
        })
    }

    return (
        <div className="products-wrapper">
            <Heading size={2}>Продукты</Heading>
            <br />
            <hr />
            <br />
            <div style={{color: state.color}}>
                <h2>{state.counter}</h2>
                <h2>{state.name}</h2>
            </div>
            <br />
            <button className="warning-btn" onClick={inc}>
                Increment
            </button>
            <button className="warning-btn" onClick={dec}>
                Decrement
            </button>
        </div>
    );
}

export default Products;