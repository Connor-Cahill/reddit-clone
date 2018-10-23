//////-------REPLIES IS CONTROLLER FOR CREATING COMMENTS ON COMMENTS ---- ///
// ----> replies = comments on comments (comment threads)
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');



module.exports = function(app) {

    ///Comments on comments
    //GET replies form
    app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
        if (req.user) {
            let post;
            Post.findById(req.params.postId).then((p) => {
                post = p;
                return Comment.findById(req.params.commentId);
            }).then(comment => {
                res.render('replies-new', {post, comment})
            }).catch(err => {
                console.log(err.message)
            })
        } else {
            res.redirect('/')
            console.log('User must be signed in to do that')
        }
    })

    /////POST new reply (comments on comments)
    // app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
    //     Post.findById(req.params.postId).then(post => {
    //         ///find child COMMENT of parent POST
    //         console.log(typeof post.comments);
    //         const comment = post.comments.id(req.params.commentId)
    //         /// add the reply to the comment
    //         comment.comments.unshift(req.body);
    //         return post.save();
    //     }).then(post => {
    //         res.redirect(`/posts/${req.params.postId}`);
    //
    //     }).catch(err => {
    //         console.log(err.message);
    //     })
    // })

    app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
        if(req.user) {
            const comment = new Comment(req.body);
            comment.author = req.user._id
            comment.save().then(comment => {
                return User.findById(req.user._id)
            }).then(user => {
                user.comments.unshift(comment);
                user.save();
                return Comment.findById(req.params.commentId)
            }).then(parComment => {
                parComment.comments.unshift(comment);
                return parComment.save();

            }).then(() => {
                res.redirect(`/posts/${req.params.postId}`);
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            return res.sendStatus(401).send('You must be signed in to do that! ');
        }
    })


}
