import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const AllComponents = React.lazy(() => import('./components/AllComponents.jsx'));
const LoadingSpinner = React.lazy(() => import('./components/common/LoadingSpinner'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <AllComponents />
      </Suspense>
    </BrowserRouter>
  );
}

