const Post = require('../models/post');
const Comment = require('../models/comment')
const User = require('../models/user');

module.exports = function(app) {
/************************
GET ROUTES
***********************/

    //////Get index
    app.get('/', (req, res) => {
        Post.find({}).then((posts) => {
            res.render('posts-index', {posts})
        }).catch(err => {
            console.log(err.message);
        })
    })


/************
SUBREDIT
************/

//////GET
app.get('/n/:subreddit', function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).then((posts) => {
        res.render('posts-index', { posts})
    }).catch((err) => {
        console.log(err.message);
    })
})

///////POST
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

    app.get('/posts/:id', (req, res) => {
        //Find the post
        Post.findById(req.params.id).populate('comments').then(post => {
            res.render('posts-show', { post })
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
        ///initiates instance of Post model
        const post = new Post(req.body);
        //SAVE Post model to db
        post.save((err, post) => {
            //redirect to route
            console.log(err, post);
            return res.redirect(`/`);
        })
    })


};
