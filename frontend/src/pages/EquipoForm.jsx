import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Input, Select, Option, Button, Typography } from '@material-tailwind/react';

export default function EquipoForm() {
  const [equipo, setEquipo] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    precio_diario: '',
    estado: 'activo',
    disponible: true
  });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/equipos', equipo, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => alert('Equipo registrado'));
  };

  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <CardBody>
        <Typography variant="h5">Registro de Equipo</Typography>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input label="Nombre" value={equipo.nombre} onChange={e => setEquipo({ ...equipo, nombre: e.target.value })} />
          <Select label="Categoría" value={equipo.categoria} onChange={val => setEquipo({ ...equipo, categoria: val })}>
            <Option value="construcción">Construcción</Option>
            <Option value="eventos">Eventos</Option>
            <Option value="industrial">Industrial</Option>
          </Select>
          <Input label="Precio Diario (S/.)" type="number" value={equipo.precio_diario} onChange={e => setEquipo({ ...equipo, precio_diario: e.target.value })} />
          <Input label="Descripción" value={equipo.descripcion} onChange={e => setEquipo({ ...equipo, descripcion: e.target.value })} />
          <div className="col-span-2">
            <Button type="submit">Guardar Equipo</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
