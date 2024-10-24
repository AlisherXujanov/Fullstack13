import "./style.scss";
import Heading from "../common/Heading";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MapComponent from "../common/MapComponent";
import { useNavigate } from "react-router-dom";

// RULE
// 1. Import any hook from 'react'
//    ex:   import { useState } from 'react';

// 2. Hooks must be called in the component body first of all meaning that
//    you should call it before anything else

// 3. useState:  when using useState hook, you get two params from it
//    - first:  variable that is used as memory of component
//    - function:  function that is used to update the variable
//                 You must use only this function but not other ones!

function Contacts() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "+998",
  });

  useEffect(() => {
    document.title = "Contacts";
    console.clear()
  }, []);

  function setInputValueIntoState(e) {
    // let name = e.target.name
    // let value = e.target.value
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  function submit(e) {
    e.preventDefault()
  }

  const office_coordinates = [41.2995958, 69.2400934];

  return (
    <main className="contacts-page-wrapper">
      <Heading size={1}>Контакты</Heading>

      <div className="row">
        <div className="left">
          <div className="info">
            <h1>Get in Touch with Us</h1>
            <br />
            <section class="intro">
              <p>Thank you for visiting our website! We value your feedback, questions, and any inquiries you may have. Whether you're a customer, business partner, or just curious, feel free to reach out using the contact methods below. We're committed to providing exceptional service and timely responses.</p>
            </section>
            <br />
            <h2>How to Reach Us:</h2>
            <br />
            <div class="contact-block">
            <h3>Customer Support</h3>
            <br />
            <p>For all general inquiries, product information, or support-related questions, our dedicated customer support team is available to assist you.</p>
              <ul>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                  </svg>
                    <strong>Email:</strong> <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>
                </li>
                <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                    <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                  </svg>
                    <strong>Phone:</strong> <a href="tel:+998915439636">+998 91 543-96-36</a>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                  </svg>
                    <strong>Live Chat:</strong> Available Mon-Fri, 9 AM - 5 PM (EST)    
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="rigth">
          <form onSubmit={submit}>
            <div className="form-control">
              <input
                onChange={setInputValueIntoState}
                type="text"
                placeholder="Name"
                name="name"
                value={state.name}
                pattern="^[a-zA-Z_ ]+$"
              />
            </div>
            <div className="form-control">
              <input
                onChange={setInputValueIntoState}
                type="email"
                placeholder="Email"
                name="email"
                value={state.email}
              />
            </div>
            <div className="form-control">
              <PhoneInput
                inputClass="phone-input"
                inputProps={{ required: true, name: "phone" }}
                country={"uzb"}
                onChange={(val) => setState({ ...state, phone: val })}
                placeholder="Phone"
                value={state.phone}
              />
            </div>
            <div className="form-control">
              <button className="warning-btn">Подписаться</button>
            </div>
          </form>
        </div>
      </div>

      <div className="maps">
        <div className="item">
          <Heading size={2}>Офис в Самарканде</Heading>
          <MapComponent coords={office_coordinates} />
        </div>
        <div className="item">
          <Heading size={2}>Ваша местоположение</Heading>
          <MapComponent />
        </div>
      </div>
    </main>
  );
}

export default Contacts;