import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Input, Select, Option, Button, Typography } from '@material-tailwind/react';

export default function UsuarioForm() {
  const [usuario, setUsuario] = useState({ nombre: '', email: '', password: '', rol: '' });
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/usuarios', usuario, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => {
      setMensaje('Usuario creado correctamente');
    }).catch(err => setMensaje(err.response?.data?.error || 'Error al registrar usuario'));
  };

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardBody>
        <Typography variant="h5">Registro de Empleado</Typography>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input label="Nombre" value={usuario.nombre} onChange={e => setUsuario({ ...usuario, nombre: e.target.value })} />
          <Input label="Correo" value={usuario.email} onChange={e => setUsuario({ ...usuario, email: e.target.value })} />
          <Input label="Contraseña" type="password" value={usuario.password} onChange={e => setUsuario({ ...usuario, password: e.target.value })} />
          <Select label="Rol" value={usuario.rol} onChange={val => setUsuario({ ...usuario, rol: val })}>
            <Option value="admin">Administrador</Option>
            <Option value="empleado">Empleado</Option>
            <Option value="finanzas">Finanzas</Option>
          </Select>
          <Button type="submit">Registrar Usuario</Button>
        </form>
        {mensaje && <Typography color="green" className="mt-2">{mensaje}</Typography>}
      </CardBody>
    </Card>
  );
}
