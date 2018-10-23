const Post = require('../models/post');
const Comment = require('../models/comment')
const User = require('../models/user');

module.exports = function(app) {
/************************
GET ROUTES
***********************/
// function setCurUser() {
//     const currentUser = req.user;
// }
    //////Get index
    app.get('/', (req, res) => {
        const currentUser = req.user;
        Post.find({}).then((posts) => {
            console.log('this is the current user -----> ' + currentUser)
            res.render('posts-index', {posts: posts, currentUser: currentUser})
        }).catch(err => {
            console.log(err.message);
        })
    })


/************
SUBREDIT
************/

//////GET
app.get('/n/:subreddit', function(req, res) {
    const currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).then((posts) => {
        res.render('posts-index', { posts, currentUser })
    }).catch((err) => {
        console.log(err.message);
    })
})

///////POST//////
app.post('/n/:subreddit', function(req, res) {
    Post.find({ subreddit: req.params.subreddit}).then((posts) => {
        res.render('posts-index', { posts })
    }).catch(err => {
        console.log(err.message);
    })
})
//// go to new post form ////
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });
///SHOW SINGLE POST
    app.get('/posts/:id', (req, res) => {
        const currentUser = req.user;
        //Find the post
        Post.findById(req.params.id).populate('author').populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).populate({
            path: 'comments',
            populate: {
                path: 'comments',
                populate: {
                    path: 'author'
                }
            }
        }).populate({
            path: 'comments',
            populate: {
                path: 'comments',
                populate: {
                    path: 'author'
                }
            }
        }).then(post => {
            res.render('posts-show', { post, currentUser })
        }).catch(err => {
            console.log(err.message);
        })
    })




/******************************
POST ROUTES
****************************/

    ////POST- creates new post
    // app.post('/posts/new', (req, res) => {
    //     console.log(req.body);
    // })


    ///CREATE
    app.post('/posts', (req, res) => {
        if (req.user) {///initiates instance of Post model
        const post = new Post(req.body);
        console.log('in IF Block -------> ')
        post.author = req.user._id
        //SAVE Post model to db
        post.save((err, post) => {
            return User.findById(req.user._id).then((user) => {
                user.posts.unshift(post);
                console.log('In THEN Block ...');
                user.save();
                //redirect to the post
                res.redirect('/posts/' + post._id)
            }).catch(err => {
                console.log('in CATCH block ...')
                console.log(err.message);
            })
        })
    } else {
        console.log('In ELSE Block ------>');
        return res.status(401).send('You need to be logged in to do that.');

    }
    })


};
