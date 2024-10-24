import "./style.scss"
import { BASE_URL_APIS } from "../../../store"
import { getTokenFromLS } from "../../../store/helpers"
import { toast } from "react-toastify"
import { useState } from "react"

function CreateCommentForm(props) {
    const [form, setForm] = useState({
        content: "",
        nft: "...",
        user_profile: "...",
        likes: [],
    })

    async function submit(e) {
        e.preventDefault()
        const URL = `${BASE_URL_APIS}nft-comments/`
        const FETCH_METHOD = "POST"

        try {
            fetch(URL, {
                method: FETCH_METHOD,
                headers: {
                    Authorization: "Token " + getTokenFromLS()
                },
                body: JSON.stringify(form)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Product created successfully")
                    setForm({ content: "" })
                    props.fetchProductsFn()
                })
        }
        catch (e) {
            toast.error("Error creating comment")
        }
    }

    return (
        <div className="create-comment-section-wrapper">
            <form onSubmit={submit}>
                <div className="form-control">
                    <textarea
                        rows={10}
                        value={form.content}
                        placeholder="Enter your comment here..."
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        required
                    ></textarea>
                </div>
                <div className="form-control">
                    <button type="submit">Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCommentForm