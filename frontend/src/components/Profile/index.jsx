import {getTokenFromLS, getUserProfile, fetchLogout} from '../../store/helpers'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import './style.scss'

function Profile() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState()
    useEffect(()=>{
        async function fetchGetUserProfile(){
            const userData = await getUserProfile()
            setProfile(userData)
        }
        fetchGetUserProfile()
    },[])
    console.log(profile)
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
                    <p>{profile.user.email}</p>
                ) : (
                    <p>Email not specified</p>
                )
            }

        </div>
        <div className="right">
            <button className='warning-btn'>Выйти</button>
        </div>
        </div>
        </>
     );
}

export default Profile;