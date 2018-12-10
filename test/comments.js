const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should();
const expect = chai.expect();
const server = require('../server.js');
const Post = require('../models/post')
const Comment = require('../models/comment');

chai.use(chaiHttp);
const agent = chai.request.agent(server);
const user = { username: 'ccahill', password: 'connor'}
const post = {title: "post title", url: "https://www.google.com", summary: "post summary", author: user };

const comment = { content: 'Testing comments', author: user, postId: post.id }

// describe('Comments', () => {
//     ///Log user in before tests run 
//     before((done) => {
//         agent
//         .post('/login')
//         .send(user)
//         .end((err, res) => {
//             done();
//         })
//     })
//     after((done) => {
//         Post.deleteMany(post).exec((err, posts) => {
//             return posts.remove();
//             done();
//         })
//     })

//     it('Should return all comments on a specific post at GET: /posts/:postId/comments', (done) => {
//         agent
//         .get(`/posts/${post.id}`)
//         .end((err, res) => {
//             res.status.should.be(200);
//             expect(res.body).to.contain('comments');
//             done();
//         })
//     })
//     it('Should create a new comment at POST: /posts/:postId/comments', (done) => {
//         agent
//         .post(`/posts/${post.id}/comments`)
//         .send(comment)
//         .end((err, res) => {
//             res.status.should.equal(200);
//             expect(res.body).to.contain(comment)
//             done();
//         })
//     })
// })
