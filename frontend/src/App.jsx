import React, { Suspense, useReducer, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { globalContext, globalReducer, initialState } from './store';
import 'react-toastify/dist/ReactToastify.css';

const AllComponents = React.lazy(() => import('./components/AllComponents.jsx'));
const LoadingSpinner = React.lazy(() => import('./components/common/LoadingSpinner'));

export default function App() {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  state.dispatch = dispatch;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        toast.dismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <div className='toast-warpper'>
          <ToastContainer />
        </div>

        {state.loaded ? 
          <globalContext.Provider value={state}>
            <AllComponents />
          </globalContext.Provider>
         : 
          <LoadingSpinner />
        }
      </Suspense>
    </BrowserRouter>
  );
}