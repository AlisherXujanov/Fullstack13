import "./style.scss"
import Heading from "../../common/Heading"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { BASE_AUTH_URL } from "../../../store";


function ActivateAccount() {
    const { uid, token } = useParams()

    useEffect(() => {
        const URL = BASE_AUTH_URL + "users/activation/"
        try {
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uid, token })
            })
                .then(res => console.log(res))
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div className="account-activation-page">
            <Heading size={1.4}>Success</Heading>
            <h3>Your account has been successfully activated!</h3>
            <h3>You can login now</h3>
        </div>
    );
}

export default ActivateAccount;