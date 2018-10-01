const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = function(app) {

/***********************
POST ROUTES
************************/

//crete comment
app.post('/posts/:postId/comments', function(req, res) {
    //creating instance of model
    const comment = new Comment(req.body)

    //save instance of comment model to DB
    comment.save().then((comment) => {
        //redirect to route
        return Post.findById(req.params.postId)
        }).then((post) => {
            post.comments.unshift(comment)
            return post.save()
        }).then((post) => {
            console.log(comment);
            res.redirect('/')
        }).catch(err => {
            console.log(err.message);
    })
    })
}
