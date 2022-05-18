import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Appartements from './pages/Appartements';
import Locataires from './pages/Locataires';


function App() {
  return (
    <>
    <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="/appartements" element={<Appartements/>} />
            <Route path="/locataires" element={<Locataires/>} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
