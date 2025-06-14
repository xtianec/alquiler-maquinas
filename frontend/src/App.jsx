import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReservaForm from './pages/ReservaForm';
import ClienteForm from './pages/ClienteForm';
import UsuarioForm from './components/usuarioForm';
import Sidebar from './components/sidebar';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    // Refrescar estado desde localStorage al cargar
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const isAuth = !!user;

  return (
    <BrowserRouter>
      {isAuth && <Sidebar rol={user?.rol} />}
      <Routes>
        <Route path="/" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {user?.rol === 'admin' && <Route path="/usuarios" element={<UsuarioForm />} />}
        {['admin', 'empleado'].includes(user?.rol) && (
          <>
            <Route path="/clientes" element={<ClienteForm />} />
            <Route path="/reservas" element={<ReservaForm />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
