import "../Authentication/authContent.scss"
import "./profileContent.scss"
import Heading from '../common/Heading'
import { useState } from 'react'
import { toast } from 'react-toastify';


function Update(props) {
    const [profileState, setProfileState] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        bio: '',
    })
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
    })

    async function submit(e) {
        e.preventDefault();

        const updatedUser = {
            username: profileState.username,
            email: profileState.email,
            first_name: profileState.first_name,
            last_name: profileState.first_name,
            bio: profileState.first_name,
        }
        // TODO: Implement the function registerNewUser
        // try {
        //     let response = await registerNewUser(updatedUser)
        //     let status_code = response.status
        //     let data = await response.json()

        //     if (status_code == 400) {
        //         for (let key in data) {
        //             toast.error(String(data[key]), { theme: 'dark' })
        //         }
        //     } else {
        //         toast.success("Account successfully created. Now You can log in!", { theme: 'dark' })
        //         props.setIsRegistered()
        //     }
        // }
        // catch (error) {
        //     toast.error(error, { theme: 'dark' })
        // }
        // finally {
        //     e.target.reset()
        // }
    }

    function handleState(e) {
        validate(e.target)

        const key = e.target.name
        const val = e.target.value
        setProfileState({ ...profileState, [key]: val })
    }

    function validate({ name, value }) {
        const usernamePattern = /^[a-zA-Z0-9_]{1,10}$/
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        let error_msg = ''
        if (value.length > 0) {
            if (name == 'username') {
                if (!usernamePattern.test(value)) {
                    error_msg = "Symbols are not allowed. Length 1-10"
                }
            }
            else if (name == 'email') {
                if (!emailPattern.test(value)) {
                    error_msg = "Invalid email"
                }
            }
            else {
                throw new Error('Unknown input field')
            }
        }
        setFormErrors({ ...formErrors, [name]: error_msg })
    }


    return (
        <div className="profile-form-wrapper">
            <Heading size={1.2}>Update profile</Heading>

            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="name">Username</label>
                    <input
                        className={formErrors.username ? "error" : ""}
                        type="name" id="name" placeholder='Username' name='username'
                        onChange={handleState}
                    />
                    {
                        formErrors.username.length > 0 ?
                            <p className='error'>{formErrors.username}</p>
                            : null
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        className={formErrors.email ? "error" : ""}
                        type="email" id="email" placeholder='Email' name='email'
                        onChange={handleState}
                    />
                    {
                        formErrors.email.length > 0 ?
                            <p className='error'>{formErrors.email}</p>
                            : null
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="first_name">First name</label>
                    <input type="text" id="first_name"
                        placeholder='First name' name='first_name'
                        onChange={handleState}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="last_name">Last name</label>
                    <input type="text" id="last_name"
                        placeholder='Last name' name='last_name'
                        onChange={handleState}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="bio">Bio</label>
                    <textarea rows={10} type="text" id="bio"
                        placeholder='Bio' name='bio'
                        onChange={handleState}
                    ></textarea>
                </div>
                <div className="form-control">
                    <button className='warning-btn'>
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Update;