import "../Authentication/authContent.scss"
import "./profileContent.scss"
import Heading from '../common/Heading'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { BASE_AUTH_URL } from '../../store'


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


    useEffect(() => {
        setProfileState({
            first_name: props.profile?.user?.first_name,
            last_name: props.profile?.user?.last_name,
            username: props.profile?.user?.username,
            email: props.profile?.user?.email,
            bio: props.profile?.bio,
        })
    }, [])

    async function submit(e) {
        e.preventDefault();

        const updatedUser = {
            user: {
                username: profileState.username,
                email: profileState.email,
                first_name: profileState.first_name,
                last_name: profileState.first_name,
            },
            bio: profileState.first_name,
        }
        try {
            const TOKEN = localStorage.getItem('token')
            let response = await fetch(BASE_AUTH_URL + "users/update_profile", {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${TOKEN}`
                },
                body: JSON.stringify(updatedUser)
            })
            let data = await response.json()

            if (response.status == 400) {
                for (let key in data) {
                    toast.error(String(data[key]), { theme: 'dark' })
                }
            } else {
                toast.success("Account successfully updated.", { theme: 'dark' })
                props.closeModal()
                setTimeout(() => {
                    location.reload()
                }, 1000)
            }
        }
        catch (error) {
            toast.error(error, { theme: 'dark' })
        }
        finally {
            e.target.reset()
        }
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
                        value={profileState.username}
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
                        value={profileState.email}
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
                        value={profileState.first_name}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="last_name">Last name</label>
                    <input type="text" id="last_name"
                        placeholder='Last name' name='last_name'
                        onChange={handleState}
                        value={profileState.last_name}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="bio">Bio</label>
                    <textarea rows={10} type="text" id="bio"
                        placeholder='Bio' name='bio'
                        onChange={handleState}
                        value={profileState.bio}
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