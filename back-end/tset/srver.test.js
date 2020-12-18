var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('Test the SingIn', () => {
    it('it should return status code equal 200 ', (done) => {
        chai.request('http://127.0.0.1:5000')
            .post('/login')
            .send()
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('it should return true if login successfully ', (done) => {
        // Test data.
        let UserInfo = {
            userName: "ozil",
            password: "123"
        }
        chai.request('http://127.0.0.1:5000')
            .post('/login')
            .send(UserInfo)
            .end((err, res) => {
                expect(res.body).to.equal(true);
                done();
            });
    });
    it('it should return false if login failed ', (done) => {
        // Test data.
        let UserInfo = {
            userName: "ozil",
            password: "password"
        }
        chai.request('http://127.0.0.1:5000')
            .post('/login')
            .send(UserInfo)
            .end((err, res) => {
                expect(res.body).to.equal(false);
                done();
            });
    });
});