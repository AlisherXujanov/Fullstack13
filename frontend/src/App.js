import AllComponents from "./components/AllComponents"
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { context, globalReducer, initialState } from "./store";
import { useReducer } from "react";

function App() {
  const [state, dispatch] = useReducer(globalReducer, initialState)

  const contextPayload = {
    store: state,
    setStore: dispatch
  }

  return (
    <div className="App">
      <ToastContainer />

      <BrowserRouter>
        <context.Provider value={contextPayload}>
          <AllComponents />
        </context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
