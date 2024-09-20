import "./style.scss"
import { useContext } from "react"
import { globalContext } from "../../../store"
import Heading from "../Heading"


function ModalComponent(props) {
    // * DONE
    // TODO: add scrollbar-y  if the height is too big

    const state = useContext(globalContext)
    function closeModal() {
        state.dispatch({ type: "SET_SHOW_MODAL", payload: false })
    }

    return (
        <div className="modal-component-wrapper">
            <div className="modal-content">
                <div className="modal-header">
                    <Heading size={1.2}>{props.title}</Heading>
                    <span className="close-modal" onClick={closeModal}>
                        &times;
                    </span>
                </div>
                <div className="modal-body">
                    { props.children }
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;