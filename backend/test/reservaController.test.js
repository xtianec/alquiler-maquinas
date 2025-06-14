const request = require('supertest');
const app = require('../src/app');

describe('Reserva Controller - overlapping dates', () => {
  it('should return 400 when dates overlap', async () => {
    const reserva = {
      equipoId: 1,
      clienteId: 1,
      fecha_inicio: '2024-01-01',
      fecha_fin: '2024-01-05'
    };

    await request(app).post('/api/reservas').send(reserva);

    const res = await request(app).post('/api/reservas').send(reserva);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Equipo no disponible en esas fechas');
  });
});
