import { useState } from "react"

function Test(props) {
    const [theme, setTheme] = useState(true)

    const themeColor = {
        backgroundColor: theme ? "black" : "#fff",
        color: theme ? "#fff" : "black",
    }    

    return (
        <div style={themeColor}>

            <div>
                <h1>Hello world</h1>
                {props.children}
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia quam debitis autem maxime nesciunt! Beatae, quibusdam tenetur. Odio maiores autem eveniet corporis, facilis consequatur perferendis et officia quos magnam. Nulla!</p>
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


        </div>
    )
}


export default Test;