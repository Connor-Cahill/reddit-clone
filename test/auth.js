const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);
const User = require('../models/user');
//////Test that user must be registered to login /////
// describe('User', function() {
//     it ('should not be able to login if they have not registered', (done) => {
//         agent
//         .post('/login', {username: 'wrong', password: "nope"})
//         .end(function(err, res) {
//             res.status.should.be.equal(401);
//             done();
//         });
//     });
//     it('should be able to login', (done) => {
//         agent
//         .post('/login')
//         .send({username: 'cc', password: 'cc'})
//         .end(function(err, res) {
//             res.should.have.status(200);
//             done();
//         })
//     })


// });


// // describe(User SignUp, function() {
// //     it ('should be able to signup', (done) => {
// //         user.findOneAndRemove({ username: "test" }, function () {
// //             agent
// //             .post('/sign-up')
// //             .send({username: 'newaccount', password: 'password'})
// //             .end(function(err, res) {
// //                 res.should.have.status(200);
// //                 done();
// //             })
// //         })
// //     })
// // })
