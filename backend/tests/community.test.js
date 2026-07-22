const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

let token;
let groupId;
let challengeId;
let postId;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Community Tester',
      email: 'community@example.com',
      password: 'password123',
    });
  
  if (res.body.token) {
    token = res.body.token;
  } else {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'community@example.com', password: 'password123' });
    token = loginRes.body.token;
  }
});

describe('Community Endpoints', () => {
  it('should create a new group', async () => {
    const res = await request(app)
      .post('/api/community/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        groupName: 'Test Group',
        description: 'A group for testing',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.group).toHaveProperty('_id');
    groupId = res.body.group._id;
  });

  it('should list groups with membership info', async () => {
    const res = await request(app)
      .get('/api/community/groups')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.groups.length).toBeGreaterThanOrEqual(1);
    const myGroup = res.body.groups.find(g => g._id === groupId);
    expect(myGroup.is_member).toBe(true);
  });

  it('should leave and join a group', async () => {
    // Leave
    let res = await request(app)
      .post(`/api/community/groups/${groupId}/leave`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);

    // Join
    res = await request(app)
      .post(`/api/community/groups/${groupId}/join`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should create a post in a group', async () => {
    const res = await request(app)
      .post(`/api/community/groups/${groupId}/posts`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Hello world' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.post.content).toEqual('Hello world');
    postId = res.body.post._id;
  });

  it('should fetch group posts', async () => {
    const res = await request(app)
      .get(`/api/community/groups/${groupId}/posts`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.posts.length).toBeGreaterThanOrEqual(1);
  });
  
  it('should toggle like on a post', async () => {
    let res = await request(app)
      .post(`/api/community/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.likes).toEqual(1);
    
    // Toggle off
    res = await request(app)
      .post(`/api/community/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.likes).toEqual(0);
  });

  it('should create a challenge', async () => {
    const res = await request(app)
      .post('/api/community/challenges')
      .set('Authorization', `Bearer ${token}`)
      .send({
        challengeName: '10k Steps',
        goalType: 'steps',
        goalValue: 10000,
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000 * 7), // 7 days
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.challenge).toHaveProperty('_id');
    challengeId = res.body.challenge._id;
  });

  it('should join a challenge', async () => {
    const res = await request(app)
      .post(`/api/community/challenges/${challengeId}/join`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
