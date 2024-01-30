import { globalReducer } from "./helpers"
import { createContext } from "react"

const initialState = {
    lang: 'en',
}

const context = createContext()
export {
    initialState,
    globalReducer,
    context
}