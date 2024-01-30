import './style.scss'

// Learning useContext

import { useContext, createContext, useState } from 'react'
const context = createContext()


function C1() {
    return (
        <>
            <h2>Component 1</h2>
            <C2 />
            <hr />
        </>
    )
}
function C2() {
    return (
        <>
            <h2>Component 2</h2>
            <C3 />
            <hr />
        </>
    )
}
function C3() {
    const payload = useContext(context)

    return (
        <>
            <h2>Component 3</h2>
            <input type="text"
                onChange={(e) => { payload.setInfo(e.target.value) }}
            />
        </>
    )
}


function Products() {
    const [info, setInfo] = useState("Hello world")

    const payload = { info:info,  setInfo:setInfo }

    return (
        <div id="products-wrapper">

            <context.Provider value={payload}>
                <h2>Products</h2>
                <p>{info}</p>

                <C1 />
            </context.Provider>

        </div>
    );
}

export default Products;
