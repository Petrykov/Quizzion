const request = require('supertest');
const app = require('../server.js');

let token = '';

describe('POST /api/user/login', function() {
    it('generates a token', function(done) {
      request(app)
        .post('/api/user/login')
        .send({
          username: 'quizzion_user2',
          password: 'ff47967c96b6e97403997b6ef1168fef'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          //receiving token
          token = res.body.token;
          return done();
        });
    });
  });

  describe('DELETE /api/user/logout', function() {
    it('log the user out of the application', function(done) {
      request(app)
        .delete('/api/user/logout')
        .set('Authorization', token)
        .expect(200, done());
    });
  });