import { BASE_URL, BASE_AUTH_URL } from "."
import axios from "axios"


function getTokenFromLS() {
    return localStorage.getItem("token")
}


function globalReducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, profile: action.payload }
        case 'LOGOUT':
            return { ...state, profile: {} }
        case "SET_PRODUCTS":
            return { ...state, products: action.payload }
        case "SET_SHOW_MODAL":
            return { ...state, showModal: action.payload }
        case "SET_AUTH_MODAL":
            return { ...state, authModalOpened: action.payload }
    }
}

async function fetchLogout() {
    const TOKEN = getTokenFromLS()
    let response = await fetch(BASE_AUTH_URL + "token/logout", {
        method: "POST",
        headers: {
            "Authorization": `Token ` + TOKEN
        }
    })
    if (response.status === 204) {
        localStorage.clear()
        return true
    }
    return false
}

async function fetchProducts() {
    let response = await axios.get(BASE_URL + 'products', {
        headers: {
            "Authorization": "Token " + getTokenFromLS()
        }
    })
    return response.data
}

async function getUserProfile() {
    const TOKEN = localStorage.getItem("token")
    let response = await axios.get(BASE_AUTH_URL + "users/profile", {
        headers: {
            "Authorization": `Token ${TOKEN}`
        }
    })
    if (response.status === 200) {
        return response.data
    }
    return false
}

async function fetchLogin({ username, password }) {
    const URL = BASE_AUTH_URL + "token/login"
    let response = await axios.post(URL, {
        username: username,
        password: password
    })
    if (response.status == 200) {
        localStorage.setItem("token", response.data.auth_token)
        let account = await getUserProfile()
        return account
    }
    return false
}

async function registerNewUser(new_user) {
    return await fetch(BASE_AUTH_URL + "users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(new_user)
    })
}




export {
    fetchLogin,
    globalReducer,
    fetchProducts,
    registerNewUser,
    getTokenFromLS,
    getUserProfile,
    fetchLogout
}




