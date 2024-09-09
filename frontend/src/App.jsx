import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { globalContext, globalReducer, initialState } from './store';
import { useReducer } from 'react';
import 'react-toastify/dist/ReactToastify.css';


const AllComponents = React.lazy(() => import('./components/AllComponents.jsx'));
const LoadingSpinner = React.lazy(() => import('./components/common/LoadingSpinner'));

export default function App() {
  const [state, dispatch] = useReducer(globalReducer, initialState)
  state.dispatch = dispatch

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="toast-wrapper">
          <ToastContainer />
        </div>

        <globalContext.Provider value={state}>
          <AllComponents />
        </globalContext.Provider>
      </Suspense>
    </BrowserRouter>
  );
}

