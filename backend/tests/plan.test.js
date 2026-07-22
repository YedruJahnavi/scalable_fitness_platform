const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Plan Tester',
      email: 'plan@example.com',
      password: 'password123',
    });
  
  if (res.body.token) {
    token = res.body.token;
  } else {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'plan@example.com', password: 'password123' });
    token = loginRes.body.token;
  }
});

describe('Plan Endpoints', () => {
  it('should generate a new plan', async () => {
    const res = await request(app)
      .post('/api/plans/generate')
      .set('Authorization', `Bearer ${token}`)
      .send({
        plan_type: 'muscle_gain',
        difficulty: 'intermediate',
        duration_weeks: 4
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.plan).toHaveProperty('_id');
    expect(res.body.plan.planType).toEqual('muscle_gain');
    expect(res.body.plan.difficulty).toEqual('intermediate');
    expect(res.body.plan.schedule).toHaveProperty('week_1');
    expect(res.body.plan.schedule.week_1.length).toEqual(7); // 7 days
  });

  it('should fetch all plans', async () => {
    const res = await request(app)
      .get('/api/plans')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.plans).toBeInstanceOf(Array);
    expect(res.body.plans.length).toBeGreaterThanOrEqual(1);
  });

  it('should fetch the active plan', async () => {
    const res = await request(app)
      .get('/api/plans/active')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.plan.isActive).toBe(true);
    expect(res.body.plan.planType).toEqual('muscle_gain');
  });
});
