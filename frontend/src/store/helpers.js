import { BASE_URL } from "."

function globalReducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state,  user: action.payload }
        case 'LOGOUT':
            return { ...state,  user: {} }
        case "SET_PRODUCTS":
            return { ...state, products: action.payload }
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

function userExistsInDB({ username, password }) {
    let users = getUsersFromLocalStorage()
    for (let user of users) {
        if (user.username == username && user.password == password) {
            return true
        }
    }
    return false
}

export {
    getUsersFromLocalStorage,
    addNewUserToLocalStorage,
    userExistsInDB,
    globalReducer,
    fetchProducts
}
