// const res = require('express/lib/response');
const request = require('supertest');

const server = require('./server');

const data1 = { username: "ben", password: "benben" }
const data2 = { username: "bob", password: "bobbob" }
const wrongData = { username: "bob", password: "" }
let token = ''

it("should set db environment to testing", () => {
  expect(process.env.DB_ENV).toBe('testing');
});

describe('server', () => {
  describe("GET /", () => {
    it('should return 200', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return HTML', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch(/html/i);
        });
    });
  });
  
  describe('POST /api/register', () => {

    it('should return 400 if incomplete user info', () => {
      return request(server)
        .post('/api/register')
        .send(wrongData)
        .then(res => {
          expect(res.status).toBe(400);
        })
    })
    it('should return a token', () => {
      return request(server)
        .post('/api/register')
        .send(data1)
        .then(res => {
          expect(res.body).toHaveProperty('token');
          token = res.body.token;
        })
    })
    it('should return 500 if duplicate entry', () => {
      return request(server)
        .post('/api/register')
        .send(data1)
        .then(res => {
          expect(res.status).toBe(500);
        })
    })
  })

  describe('POST /api/login', () => {
    it('should return 401 if incomplete user info', () => {
      return request(server)
        .post('/api/login')
        .send(wrongData)
        .then(res => {
          expect(res.status).toBe(401);
        })
    })
    it('should return a token', () => {
      return request(server)
        .post('/api/login')
        .send(data1)
        .then(res => {
          expect(res.body).toHaveProperty('token');
        })
    })
  })

  describe('GET /api/users', () => {
    it('should return 400 if token not provided', () => {
      return request(server)
        .get('/api/users')
        .then(res => {
          expect(res.status).toBe(400)
        })
    })
  })
});