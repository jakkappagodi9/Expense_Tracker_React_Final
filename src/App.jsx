import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './RouteLayouts/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
