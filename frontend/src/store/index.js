import { createContext } from "react";
import { globalReducer } from "./helpers";

const BASE_URL = "http://127.0.0.1:8000/apis/"
const BASE_AUTH_URL = "http://127.0.0.1:8000/auth/"


const globalContext = createContext()

const initialState = {
    profile: {},
    coordinates: {},
    products: [],
    showModal: false,
}


export {
    globalContext,
    initialState,
    globalReducer,
    BASE_URL,
    BASE_AUTH_URL
}