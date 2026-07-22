const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

let token;
let workoutId;

beforeAll(async () => {
  // Create a user and get a token
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Workout Tester',
      email: 'workout@example.com',
      password: 'password123',
    });
  
  if (res.body.token) {
    token = res.body.token;
  } else {
    // Fallback if register fails because user exists
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'workout@example.com', password: 'password123' });
    token = loginRes.body.token;
  }
});

describe('Workout Endpoints', () => {
  it('should create a new workout', async () => {
    const res = await request(app)
      .post('/api/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'strength',
        title: 'Morning Lift',
        duration: 45,
        caloriesBurned: 300,
        exercises: [{ name: 'Bench Press', sets: 3, reps: 10, weight: 60 }]
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.workout).toHaveProperty('_id');
    expect(res.body.workout.title).toEqual('Morning Lift');
    workoutId = res.body.workout._id;
  });

  it('should fetch workouts for the user', async () => {
    const res = await request(app)
      .get('/api/workouts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.workouts).toBeInstanceOf(Array);
    expect(res.body.workouts.length).toBeGreaterThanOrEqual(1);
  });

  it('should fetch a single workout by id', async () => {
    const res = await request(app)
      .get(`/api/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.workout._id).toEqual(workoutId);
  });

  it('should update a workout', async () => {
    const res = await request(app)
      .put(`/api/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Morning Lift' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.workout.title).toEqual('Updated Morning Lift');
  });

  it('should delete a workout', async () => {
    const res = await request(app)
      .delete(`/api/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Deleted');
    
    // Verify deletion
    const verifyRes = await request(app)
      .get(`/api/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(verifyRes.statusCode).toEqual(404);
  });
});
