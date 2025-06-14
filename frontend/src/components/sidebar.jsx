import { Link } from 'react-router-dom';
import { Card, Typography } from '@material-tailwind/react';

export default function Sidebar({ rol }) {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Card className="fixed top-0 left-0 h-screen w-60 p-4 shadow-lg bg-white z-50">
      <Typography variant="h5" className="mb-4">Menú</Typography>
      <nav className="flex flex-col space-y-2">
        <Link to="/">Dashboard</Link>
        {rol === 'admin' && <Link to="/usuarios">Usuarios</Link>}
        {['admin', 'empleado'].includes(rol) && <Link to="/clientes">Clientes</Link>}
        {['admin', 'empleado'].includes(rol) && <Link to="/reservas">Reservas</Link>}
        <button onClick={logout} className="mt-6 text-red-600">Cerrar sesión</button>
      </nav>
    </Card>
  );
}
