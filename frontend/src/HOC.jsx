import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn } from ''
import { toast } from 'react-toastify'

export default function withAuthCheck(Component) {
    return function AuthenticatedComponent(props) {
        const navigate = useNavigate()

        useEffect(() => {
            if (!isLoggedIn()) {
                navigate('/auth')
            }
        }, [navigate])


        return <Component {...props} />
    }
}