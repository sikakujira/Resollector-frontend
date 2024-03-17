import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/routes/PrivateRoute';
import { useEffect } from 'react';
import axiosInstance from './services/axiosInstance';

function App() {
 
   useEffect(() => {
    const getCsrf = async() => {
      try {
        await axiosInstance({
          method: 'GET',
          url: '/api/v1/csrf',
        })
      } catch (e) {
        console.error(e);
      }
    }
    getCsrf();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<PrivateRoute/>}/>
          <Route path={'/signin'} element={<Signin/>}/>
          <Route path={'/signup'} element={<Signup/>}/>
          <Route path={'*'} element={<h1>404 Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
