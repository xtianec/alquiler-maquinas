import React from 'react';
import { Card, Typography } from '@material-tailwind/react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-8">
      <Card className="p-6 shadow-md">
        <Typography variant="h4">Bienvenido, {user.nombre}</Typography>
        <Typography variant="paragraph" className="mt-2">
          Acceso como <strong>{user.rol.toUpperCase()}</strong>.
        </Typography>
      </Card>
    </div>
  );
}
