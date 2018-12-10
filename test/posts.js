const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should();
const expect = chai.expect;
const server = require('../server.js');
const Post = require('../models/post')

chai.use(chaiHttp);
const agent = chai.request.agent(server);


const post = {title: "post title", url: "https://www.google.com", summary: "post summary"}
const user = { username: 'ccahill', password: 'connor'}


describe('Posts', () => {
    // const token;
    before((done) => {
        agent
        .post('/login')
        .send(user)
        .end((err, res) => {
            done();
        })
        
    })

    after(() => {
        Post.deleteMany(post).exec((err, posts) => {
            return posts.remove();
        })
    })

    it('Should return all posts at GET: / ', (done) => {
        agent
        .get('/')
        .end((err, res) => {
            res.status.should.be.equal(200);
            done();
        })

    })

    it(' Should return single post with Comments at GET: /posts/:id', (done) => {
        const sampleId = '5bad4ff730cf354056ad8e2b';
        agent
        .get(`/posts/${sampleId}`)
        .end((err, res) => {
            res.status.should.be.equal(200);
            ///Also checks if comments are rendering with posts
            expect(res.body).to.contain('comments');
            expect(res.body).to.contain('title');
            done();
        })
    })

    it('Should create new post at POST: /posts', (done) => {
        agent
        .post('/posts')
        .send(post)
        .end((err, res) => {
            res.status.should.be.equal(200);
            done();
        })
    })
});

 
