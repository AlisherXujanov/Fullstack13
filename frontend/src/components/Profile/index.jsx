import { getUserProfile, fetchLogout } from '../../store/helpers'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { globalContext, BASE_URL, BASE_AUTH_URL } from "../../store"
import Update from "./Update.jsx"
import { ProfileLoader } from '../common/Loaders.jsx'
import './style.scss'
import '../Authentication/style.scss'
import { toast } from 'react-toastify'
import LoadingSpinner from '../common/LoadingSpinner/index.jsx'

function Profile() {
    const navigate = useNavigate()
    const state = useContext(globalContext)
    const [profile, setProfile] = useState()
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(true)

    useEffect(() => {
        fetchGetUserProfile()
    }, [])
    async function fetchGetUserProfile(profilePictureUpdate=false) {
        if (!profilePictureUpdate) {
            setIsLoading(true)
        }
        const userData = await getUserProfile()
        setIsLoading(false)
        setProfile(userData)
    }

    async function logout() {
        state.dispatch({ type: "LOGOUT" })
        await fetchLogout()
        navigate("/")
        toast.success("You have successfully logged out", { theme: "dark" })
    }
    function closeModal() {
        setShowModal(false)
    }
    async function fetchChangeProfilePicture(e) {
        e.preventDefault()
        setImageLoaded(false)

        const file = e.target.files[0]
        let formData = new FormData()
        formData.append('image', file)
        formData.append('user', profile.user.id)

        try {
            const TOKEN = localStorage.getItem('token')
            let response = await fetch(BASE_AUTH_URL + `users/update_profile_image/${profile.id}/`, {
                method: 'PUT',
                headers: { "Authorization": `Token ${TOKEN}` },
                body: formData
            })
            let data = await response.json()
            console.log(data)

            if (response.status == 400) {
                for (let key in data) {
                    toast.error(String(data[key]), { theme: 'dark' })
                }
            } else {
                toast.success("Image successfully updated.", { theme: 'dark' })
                await fetchGetUserProfile(true)
                setImageLoaded(true)
            }
        }
        catch (error) {
            toast.error(error, { theme: 'dark' })
        }
    }
    return (
        <>
            <div className="profile-wrapper">
                {isLoading && (<div className='loader-container'><ProfileLoader /></div>)}
                {!isLoading && (
                    <>
                        <div className="left profile-picture-settings">
                            {imageLoaded
                                ?
                                <>
                                    <img src={BASE_URL + profile?.image} alt="" />
                                    <div className="update-settings-wrapper">
                                        <span className="icon-holder">
                                            <svg aria-hidden="true" height="35" viewBox="0 0 16 16" version="1.1" width="35" data-view-component="true" className="octicon octicon-pencil">
                                                <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
                                            </svg>
                                        </span>
                                        <input className='update-image-input' type="file" onChange={fetchChangeProfilePicture} />
                                    </div>
                                </>
                                :
                                <div className="update-settings-wrapper">
                                    <LoadingSpinner offset={true} />
                                </div>
                            }
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
                        </div>
                    </>
                )}
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