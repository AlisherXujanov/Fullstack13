import { createContext } from "react";
import { globalReducer } from "./helpers";

const BASE_URL = "https://alisherkhujanov.pythonanywhere.com/"
const BASE_URL_APIS = BASE_URL + "apis/"
const BASE_AUTH_URL = BASE_URL + "auth/"


const globalContext = createContext()

const initialState = {
    profile: {},
    coordinates: {},
    products: [],
    showModal: false,
    authModalOpened: false,
    loaded: true,
}


export {
    globalContext,
    initialState,
    globalReducer,
    BASE_URL,
    BASE_URL_APIS,
    BASE_AUTH_URL
}