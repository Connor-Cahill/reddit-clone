const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const Post = require('../models/post')

chai.use(chaiHttp);

const post = {title: "post title", url: "https://www.google.com", summary: "post summary"}
/*
describe('Posts', () => {
    it('should create with valid attributes at POST /posts', (done) => {
        Post.findOneAndDelete(post, () => {
            Post.find((err, posts) => {
                const postCount = posts.count;
                chai.request('localhost:3000')
                .post('/posts', post)
                .end(function(err, res) {
                    Post.find(function(err, posts) {
                        console.log(posts);
                        postCount.should.be.equal(posts + 1);
                        res.should.have.status(200);
                        done();
                    });
                });
            });
        });
    });
});
*/
 
