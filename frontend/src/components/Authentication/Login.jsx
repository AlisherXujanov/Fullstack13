import "./authContent.scss"
import Heading from '../common/Heading'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { fetchLogin } from "../../store/helpers";
import { useContext } from "react"
import { globalContext } from "../../store"
import {useNavigate} from 'react-router-dom'

function Login(props) {
    const navigate = useNavigate()
    const state = useContext(globalContext)


    const [loginState, setLoginState] = useState({
        username: "",
        password: "",
    })
    const [formErrors, setFormErrors] = useState({
        username: "",
        password: "",
    })

    async function submit(e) {
        e.preventDefault();
        const passwordPattern = /^[a-zA-Z0-9_$&]{5,}$/
        let user = {
            username: loginState.username,
            password: loginState.password
        }

        if (user.username.length == 0 || user.password.length == 0) {
            toast.error("Please, fill in all fields", { theme: "dark" })
            return
        } else if (!passwordPattern.test(user.password)) {
            setFormErrors({ ...formErrors, ['password']: "Symbols are not allowed except:($,&,_). Length 5+" })
            return
        } else {
            try {
                let account = await fetchLogin(user)
                toast.success("You have successfully logged in", { theme: "dark" })
                state.dispatch({ type: "SET_USER", payload:account })
                navigate('/profile')
                // TODO
                // CREATE profile-page
                // SET image of the user instead of his username
                props.closeModal()
            } catch(error) {
                toast.error("User not found with provided credentials", { theme: "dark" })
            }
        }
        setLoginState({
            username: "",
            password: "",
        })
    }


    function handleState(e) {
        const { name, value } = e.target
        validate(e.target)

        // const key = e.target.name
        // const val = e.target.value
        setLoginState({ ...loginState, [name]: value })
    }


    function validate({ name, value }) {
        // immediateFeedbackOnError
        // STEPS:
        // 1. Create patterns
        const usernamePattern = /^[a-zA-Z0-9_]{1,10}$/
        const passwordPattern = /^[a-zA-Z0-9_$&]{5,}$/

        // 2. Check if the value matches the pattern
        // 3. Create an error message
        let error_msg = ''
        if (value.length > 0) {
            if (name == 'username') {
                if (!usernamePattern.test(value)) {
                    error_msg = "Symbols are not allowed. Length 1-10"
                }
            } else if (name == 'password') {
                if (value.length >= 5 && !passwordPattern.test(value)) {
                    error_msg = "Symbols are not allowed except:($,&,_). Length 5+"
                }
            } else {
                throw new Error('Unknown input field')
            }
        }
        return setFormErrors({ ...formErrors, [name]: error_msg })
    }


    return (
        <div className="auth-content-wrapper">
            <Heading size={1.2}>Login</Heading>


            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="name">Username or e-mail</label>
                    <input
                        id="name"
                        type="name"
                        placeholder='Username or e-mail'
                        name='username'
                        className={formErrors.username.length > 0 ? 'error' : null}
                        onChange={handleState}
                        value={loginState.username}
                    />
                    {
                        formErrors.username.length > 0 ?
                            <p className='error'>{formErrors.username}</p>
                            : null
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder='Password'
                        name='password'
                        className={formErrors.password.length > 0 ? 'error' : null}
                        onChange={handleState}
                        value={loginState.password}
                    />
                    {
                        formErrors.password.length > 0 ?
                            <p className='error'>{formErrors.password}</p>
                            : null
                    }
                </div>
                <div className="form-control">
                    <button className='warning-btn'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;