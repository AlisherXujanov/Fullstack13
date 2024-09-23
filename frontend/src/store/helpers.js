import { BASE_URL, BASE_AUTH_URL } from "."
import axios from "axios"

function globalReducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state,  profile: action.payload }
        case 'LOGOUT':
            return { ...state,  profile: {} }
        case "SET_PRODUCTS":
            return { ...state, products: action.payload }
        case "SET_SHOW_MODAL":
            return { ...state, showModal: action.payload }
    }
}

async function fetchProducts() {
    try {
        const res = await fetch(BASE_URL + 'products')
        const data = await res.json()
        return data
    } catch (err) {
        return console.log(err)
    }
}

function getUsersFromLocalStorage() {
    let users = localStorage.getItem('users') ?? "[]"
    return JSON.parse(users) // [...]
}

function addNewUserToLocalStorage(new_user) {
    let { username, email } = new_user
    let existingUsers = getUsersFromLocalStorage()

    let userExists = false
    for (let user of existingUsers) {
        if (user.username == username || user.email == email) {
            userExists = true
        }
    }
    if (userExists) {
        return false
    } else {
        existingUsers.push(new_user)
        localStorage.setItem('users', JSON.stringify(existingUsers))
        return true
    }
}


async function getUserProfile() {
    const TOKEN = localStorage.getItem("token")
    let response = await axios.get(BASE_AUTH_URL + "users/profile", {
        headers: {
            "Authorization": `Token ${TOKEN}`
        }
    })
    if (response.status == 200) {
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

export {
    getUsersFromLocalStorage,
    addNewUserToLocalStorage,
    fetchLogin,
    globalReducer,
    fetchProducts
}
