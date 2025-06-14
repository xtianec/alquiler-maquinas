import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Input, Button, Typography } from '@material-tailwind/react';

export default function ClienteForm() {
  const [cliente, setCliente] = useState({
    tipo_cliente: 'persona_natural',
    tipo_documento: 'dni',
    documento: '',
    nombre_completo: '',
    razon_social: '',
    correo: '',
    telefono: ''
  });
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/clientes', cliente, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMensaje('Cliente registrado');
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardBody>
        <Typography variant="h5">Registro de Cliente</Typography>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input label="Documento" value={cliente.documento} onChange={e => setCliente({ ...cliente, documento: e.target.value })} />
          <Input label="Nombre" value={cliente.nombre_completo} onChange={e => setCliente({ ...cliente, nombre_completo: e.target.value })} />
          <Input label="Correo" value={cliente.correo} onChange={e => setCliente({ ...cliente, correo: e.target.value })} />
          <Input label="Teléfono" value={cliente.telefono} onChange={e => setCliente({ ...cliente, telefono: e.target.value })} />
          <Button type="submit">Guardar</Button>
          {mensaje && <Typography color="green" className="mt-2">{mensaje}</Typography>}
        </form>
      </CardBody>
    </Card>
  );
}
