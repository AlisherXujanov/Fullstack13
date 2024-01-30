import { globalReducer } from "./helpers"
import { createContext } from "react"

const initialState = {
    lang: 'en',
    count: 0
}

const context = createContext()
export {
    initialState,
    globalReducer,
    context
}