const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = function(app) {

/***********************
POST ROUTES
************************/

////new create route
// app.post('/posts/:postId/comments', (req, res) => {
//     Post.findById(req.params.postId).exec(function(err, post) {
//         if(err) {console.log(err.message)}
//         //unshift new comments
//         post.comments.unshift(req.body);
//         post.save();
//
//         return res.redirect(`/posts/${post._id}`);
//     })
// })



//crete comment ----- OLD comment create route ---
app.post('/posts/:postId/comments', function(req, res) {
    //creating instance of model
    if (req.user) {
    const comment = new Comment(req.body)
    comment.author = req.user._id;


    //save instance of comment model to DB
    comment.save().then((comment) => {

        return User.findById(req.user._id)
    }).then(user => {
        console.log('in second then block ------> ' + comment);
            user.comments.unshift(comment);
            user.save();
            return Post.findById(req.params.postId);
        }).then(post => {
            post.comments.unshift(comment)
            return post.save()
        }).then((post) => {
            console.log(comment);
            res.redirect(`/posts/${req.params.postId}`);
        }).catch(err => {
            console.log(err.message);
        })

    }else {
        return res.status(401).send('You need to be logged in to do that.');
    }
})
}
