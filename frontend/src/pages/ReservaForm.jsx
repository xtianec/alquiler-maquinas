import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Input, Select, Option, Button, Typography } from '@material-tailwind/react';

export default function ReservaForm() {
  const [reserva, setReserva] = useState({
    clienteId: '',
    equipoId: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  const [equipos, setEquipos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/equipos', config()).then(res => setEquipos(res.data));
    axios.get('http://localhost:4000/api/clientes', config()).then(res => setClientes(res.data));
  }, []);

  const config = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/reservas', reserva, config());
      setMensaje('Reserva realizada con éxito');
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error en la reserva');
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <CardBody>
        <Typography variant="h5">Nueva Reserva</Typography>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Select label="Cliente" value={reserva.clienteId} onChange={val => setReserva({ ...reserva, clienteId: val })}>
            {clientes.map(cli => (
              <Option key={cli.id} value={cli.id}>{cli.nombre_completo || cli.razon_social}</Option>
            ))}
          </Select>
          <Select label="Equipo" value={reserva.equipoId} onChange={val => setReserva({ ...reserva, equipoId: val })}>
            {equipos.map(eq => (
              <Option key={eq.id} value={eq.id}>{eq.nombre}</Option>
            ))}
          </Select>
          <Input label="Fecha Inicio" type="date" value={reserva.fecha_inicio} onChange={e => setReserva({ ...reserva, fecha_inicio: e.target.value })} />
          <Input label="Fecha Fin" type="date" value={reserva.fecha_fin} onChange={e => setReserva({ ...reserva, fecha_fin: e.target.value })} />
          <div className="col-span-2">
            <Button type="submit">Registrar Reserva</Button>
            {mensaje && <Typography color="red" className="mt-2">{mensaje}</Typography>}
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
