import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      window.location.href = '/';
    } catch (err) {
      alert('Error en login');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-20 p-6">
      <Typography variant="h4" className="mb-4">Login</Typography>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input label="Correo" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Contraseña" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" fullWidth>Ingresar</Button>
      </form>
    </Card>
  );
}
