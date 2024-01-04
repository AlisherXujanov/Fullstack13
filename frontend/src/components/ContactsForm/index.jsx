import "./style.scss"
import Rectangle from "../../assets/images/Rectangle.png"

function ContactsForm(props) {
    function submit(e) {
        e.preventDefault()
    }
    return (
        <div className="contacts-form-container">
            <div className="left">
                <form onSubmit={submit}>
                    <input type="text" placeholder="Fullname" />
                    <div className="contacts-details">
                        <input type="email" placeholder="Email"/>
                        <input type="text" placeholder="Phone number"/>
                    </div>
                    <textarea cols="5" placeholder="Text content"></textarea>
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