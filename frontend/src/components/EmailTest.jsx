import { useState } from 'react'
import { Resend } from 'resend';
import "./emailTest.scss"
import Email from "../emails/Email"

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

function EmailTest() {
    const [emailForm, setForm] = useState({
        username: '',
        subject: '',
        to: '',
        from: 'REPLACE_THIS',
    })

    async function submit(e) {
        e.preventDefault()

        try {
            await resend.emails.send({
                from: "alisherxujanov163@gmail.com",
                to: emailForm.to,
                subject: emailForm.subject,
                react: <Email username={emailForm.username} />,
            });
        }
        catch (e) {
            console.log(e)
        }
    }

    function handleForm(e) {
        setForm({ ...emailForm, [e.target.name]: e.target.value })
    }

    return (
        <div className='email-form'>
            <h1>Email Test</h1>

            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={emailForm.username} onChange={handleForm} />
                </div>
                <div className="form-control">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" name="subject" value={emailForm.subject} onChange={handleForm} />
                </div>
                <div className="form-control">
                    <label htmlFor="to">To</label>
                    <input type="text" name="to" value={emailForm.to} onChange={handleForm} />
                </div>
                <div className="form-control">
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
}

export default EmailTest;