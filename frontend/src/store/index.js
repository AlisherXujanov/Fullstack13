import { createContext } from "react";
import { globalReducer } from "./helpers";

const BASE_URL = "http://127.0.0.1:8000/apis/"

const globalContext = createContext()

const initialState = {
    user: {},
    coordinates: {},
    products: [],
    showModal: false,
}


export {
    globalContext,
    initialState,
    globalReducer,
    BASE_URL
}