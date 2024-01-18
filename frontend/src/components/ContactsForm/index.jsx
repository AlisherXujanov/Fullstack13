import "./style.scss"
import Rectangle from "../../assets/images/Rectangle.png"


// 1. Create a form
// 2. connect it with useState
// 3. collect all data into useState
// 4. Create an account in the EmailJS.com
// 5. Install email.js in the React project
// 6. connect the form  with email.js


function ContactsForm(props) {
    
    function submit(e) {
        e.preventDefault() 
    }
    return (
        <div className="contacts-form-container">
            <div className="left">
                <form onSubmit={submit}>
                    <input className="name" type="text" placeholder="Fullname" />
                    <div className="contacts-details">
                        <input type="email" placeholder="Email"/>
                        <input type="text" placeholder="Phone number"/>
                    </div>
                    <textarea rows="5" placeholder="Text content"></textarea>
                    <button className="warning-btn">
                        Получить консультацию
                    </button>
                </form>
            </div>
            <div className="right">
                <img 
                    src={Rectangle}
                    width={"100%"} 
                    alt="Rectangle"
                />
            </div>
        </div>
    );
}

export default ContactsForm;