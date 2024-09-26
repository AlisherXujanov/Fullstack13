import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLS, getUserProfile, fetchProducts } from '../store/helpers.js'
import { globalContext } from '../store'
import { toast } from 'react-toastify'

export default function withAuthCheck(Component) {
    return function AuthenticatedComponent(props) {
        const state = useContext(globalContext)
        const navigate = useNavigate()

        useEffect(() => {
            const TOKEN = getTokenFromLS()
            if (!TOKEN) {
                sendToAuth()
                console.clear()
                return
            }
            let response = getUserProfile()
            if (response == false) {
                sendToAuth()
                console.clear()
                return
            }
            fetchEverything()
        }, [navigate])

        function sendToAuth() {
            navigate('/')
            state.dispatch({ type: "SET_AUTH_MODAL", payload: true })
            toast.warning('You need to login to access this page', { theme: 'dark', toastId: "login" })
            localStorage.clear()
            state.dispatch({ type: "SET_PRODUCTS", payload: {} })
            state.dispatch({ type: "SET_USER", payload: {} })
        }
        async function fetchEverything() {
            const data = await fetchProducts()
            state.dispatch({ type: "SET_PRODUCTS", payload: data })
            // ---------------------------------------------------
            let account = await getUserProfile()
            state.dispatch({ type: "SET_USER", payload: account })
        }

        return <Component {...props} />
    }
}