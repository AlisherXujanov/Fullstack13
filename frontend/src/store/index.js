import { createContext } from "react";
import { globalReducer } from "./helpers";

const BASE_URL = "https://alisherkhujanov.pythonanywhere.com/apis/"
const BASE_AUTH_URL = "https://alisherkhujanov.pythonanywhere.com/auth/"


const globalContext = createContext()

const initialState = {
    profile: {},
    coordinates: {},
    products: [],
    showModal: false,
    authModalOpened: false,
}


export {
    globalContext,
    initialState,
    globalReducer,
    BASE_URL,
    BASE_AUTH_URL
}