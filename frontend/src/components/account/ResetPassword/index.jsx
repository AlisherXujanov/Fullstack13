import "./style.scss"
import Heading from "../../common/Heading"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_AUTH_URL } from "../../../store";
import { toast } from 'react-toastify'


function ResetPassword() {
    const { uid, token } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        password: "",
        password_conf: "",
    })
    const navigate = useNavigate()

    function submit(e) {
        e.preventDefault();
        setIsLoading(true)
        if (form.password != form.password_conf) {
            toast.error("Passwords do not match...", { theme: "dark" })
            return
        }

        const URL = BASE_AUTH_URL + "users/reset_password_confirm/"
        try {
            fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, token, new_password: form.password })
            })
                .then(response => {
                    if (response.status === 204) {
                        toast.success("Successfully changed password! You can login now.", { theme: "dark" })
                        setIsLoading(false)
                        e.target.reset()
                        navigate('/')
                        return
                    }
                    return response.json()
                })
                .then(data => {
                    for (let error_key in data) {
                        let error_list_of_key = data[error_key]
                        for (let err of error_list_of_key) {
                            toast.error(err, { theme: 'dark' })
                        }
                    }
                })
        }
        catch (e) {
            console.log(e)
        }
    }

    function handleState(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    return (
        <div className="reset-password-wrapper auth-content-wrapper">
            {isLoading && (<div className="hollow-dots-spinner">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>)}
            {!isLoading && (
                <>
                    <Heading size={1.2}>Enter new password</Heading>

                    <form onSubmit={submit}>
                        <div className="form-control">
                            <label htmlFor="new_password">New password</label>
                            <input
                                type="password" id="password" placeholder='New password' name='password'
                                onChange={handleState}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="new_password_conf">Confirm new password</label>
                            <input
                                type="password" id="new_password_conf" placeholder='Confirm new password' name='password_conf'
                                onChange={handleState}
                            />

                        </div>

                        <div className="form-control">
                            <button type="submit" className="warning-btn">Submit</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default ResetPassword;