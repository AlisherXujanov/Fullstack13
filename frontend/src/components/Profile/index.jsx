import { getUserProfile, fetchLogout } from '../../store/helpers'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import { globalContext, BASE_URL } from "../../store"
import Update from "./Update.jsx"

import './style.scss'
import '../Authentication/style.scss'

function Profile() {
    const navigate = useNavigate()
    const state = useContext(globalContext)
    const [profile, setProfile] = useState()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        async function fetchGetUserProfile() {
            const userData = await getUserProfile()
            setProfile(userData)
        }
        fetchGetUserProfile()
    }, [])

    async function logout() {
        state.dispatch({ type: "LOGOUT" })
        await fetchLogout()
        navigate("/")
        toast.success("You have successfully logged out", { theme: "dark" })
    }

    function closeModal() {
        setShowModal(false)
    }

    return (
        <>
            <div className="profile-wrapper">
                <div className="left">
                    <img src={BASE_URL + profile?.image} alt="" />
                </div>
                <div className="middle">
                    <h1>{profile?.user.username}</h1>
                    {
                        profile?.user.first_name && profile?.user.last_name ? (
                            <p>{profile.user.first_name} {profile.user.last_name}</p>
                        ) : (
                            <p>Full name not specified</p>
                        )
                    }
                    {
                        profile?.user.email ? (
                            <a href={`mailto:${profile.user.email}`}>{profile.user.email}</a>
                        ) : (
                            <p>Email not specified</p>
                        )
                    }

                </div>
                <div className="right">
                    {
                        profile &&
                        <button className='warning-btn update' onClick={(e) => setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF6600" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                            Update
                        </button>
                    }
                    <button className='warning-btn logout' onClick={logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF6600" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                        </svg>
                        Выйти
                    </button>
                </div>
            </div>


            {
                showModal &&
                <div id='profile-update-modal-screen-wrapper'>
                    <section className='content'>
                        <button className="close-btn" onClick={closeModal}>&times;</button>
                        <Update profile={profile} closeModal={closeModal} />
                    </section>
                </div>
            }
        </>
    );
}

export default Profile;