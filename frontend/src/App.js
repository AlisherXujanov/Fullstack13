import AllComponents from "./components/AllComponents"
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { context, globalReducer, initialState } from "./store";

function App() {

  const contextPayload = {
    store: initialState,
    setStore: globalReducer
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
