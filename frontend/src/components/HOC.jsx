import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { isLoggedIn } from ''
import { globalContext } from '../store'
import { toast } from 'react-toastify'


export default function withAuthCheck(Component) {
    return function AuthenticatedComponent(props) {
        const state = useContext(globalContext)
        const navigate = useNavigate()

        useEffect(() => {
            if (2 == 2) {
                navigate('/')
                state.dispatch({ type: "SET_AUTH_MODAL", payload: true })
                toast.warning('You need to login to access this page', { theme: 'dark', toastId: "login" })
            }
        }, [navigate])


        return <Component {...props} />
    }
}