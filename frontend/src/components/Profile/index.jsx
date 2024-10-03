import { getUserProfile, fetchLogout} from '../../store/helpers'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect,useContext } from 'react';
import { globalContext } from "../../store"
import './style.scss'
function Profile() {
    const navigate = useNavigate()
    const state = useContext(globalContext)
    const [profile, setProfile] = useState()
    useEffect(()=>{
        async function fetchGetUserProfile(){
            const userData = await getUserProfile()
            setProfile(userData)
        }
        fetchGetUserProfile()
    },[])
    async function logout() {
        state.dispatch({ type: "LOGOUT" })
        await fetchLogout()
        navigate("/")
        toast.success("You have successfully logged out", { theme: "dark" })
    }
    return ( 
        <>
        <div className="profile-wrapper">
        <div className="left">
            <img src={"http://127.0.0.1:8000/"+profile?.image} alt="" />
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
            <button className='warning-btn' onClick={logout}>Выйти</button>
        </div>
        </div>
        </>
     );
}

export default Profile;