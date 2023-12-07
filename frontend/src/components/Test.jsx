import { useState } from "react"

function Test(props) {
    const [theme, setTheme] = useState(true)
    const [color, setColor] = useState()
    const [number, setNumber] = useState(1)
    const [width, setWidth] = useState(1)

    const themeColor = {
        backgroundColor: theme ? "black" : "#fff",
        color: theme ? "#fff" : "black",
    }    

    const divStyle = {
        margin: "0 auto",
        padding: "20px",
        width: `calc(${width} * 100px)`,
        backgroundColor: "lightgray",
        color: 'black'
    }

    return (
        <div style={themeColor}>

            <div style={{color:color}}>
                <h1>Hello world</h1>
                {props.children}
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia quam debitis autem maxime nesciunt! Beatae, quibusdam tenetur. Odio maiores autem eveniet corporis, facilis consequatur perferendis et officia quos magnam. Nulla!</p>
            </div>

            <hr />
            <br />
            <br />

            <input 
                type="range"
                min="1" 
                max="10" 
                step="0.5"
                onChange={(e) => {setWidth(e.target.value)}} 
            />
            <div style={divStyle}>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus debitis explicabo quo expedita. Vero amet consequatur explicabo ex, animi a. Qui recusandae quibusdam sapiente et pariatur nesciunt voluptates quae vitae!</p>
            </div>

            <hr />
            <br />
            <br />

            <button onClick={() => { setTheme(!theme) }}>
                Change theme
            </button>

            <hr />
            <br />
            <br />

            <input 
                type="color" 
                onChange={(event) => {setColor(event.target.value)}} 
            />

            <hr />  
            <br />
            <br />
            <h2>{number}</h2>
            <button onClick={() => { setNumber(number + 1) }}>
                Increment +
            </button>
            <button onClick={() => { setNumber(number - 1) }}>
                Decrement -
            </button>
            
        </div>
    )
}


export default Test;