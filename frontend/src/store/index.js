import { createContext } from "react";
import { globalReducer } from "./helpers";


const globalContext = createContext()

const initialState = {
    user: {},
    coordinates: {},

    // test
    counter: 0,
}


export {
    globalContext,
    initialState,
    globalReducer
}