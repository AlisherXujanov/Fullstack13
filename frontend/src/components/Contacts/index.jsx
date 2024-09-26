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
            <h3>Задайте нам любой вопрос</h3>
            <p>+7 701 776 24 20</p>
          </div>
          <div className="info">
            <h3>Электронная почта</h3>
            <p>client@fonte.kz</p>
          </div>
          <div className="info">
            <h3>Юридический адрес</h3>
            <p>
              050040/A15E3H4, проспект Аль-Фараби, 77/7​, 10 этаж, Алматы,
              Казахстан Z05T3D0, проспект Мангилик Ел, 55/20, Офисы 345-346,
              Астана, Казахстан
            </p>
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
