const Post = require('../models/post');
const Comment = require('../models/comment')
const User = require('../models/user');

module.exports = function(app) {

/*************************************************
----VOTING (up votes, down votes, and vote score)------
***************************************************/
///Up Votes Route *******
// app.put('/posts/:id/vote-up', (req, res) => {
//     if(req.user) {
//         Post.findById(req.params.id).exec(post => {
//             console.log('Here is the ID you are looking for ----> ' + req.params.id);
//             console.log('post is this  -----> ' + post)
//             post.upVotes.push(req.user._id)
//             post.voteScore = post.voteScore + 1;
//             post.save();
//             res.sendStatus(200);
//         })
//     } else {
//         return res.sendStatus(401).send('You need to be signed in to do that!')
//     }
//
// })


app.put('/posts/:id/vote-up', (req, res) => {
    if(req.user) {
        Post.findById(req.params.id).then(post => {
            console.log('this is post ====> ' + post);
            post.upVotes.push(req.user._id);
            post.voteScore = post.voteScore + 1;
            return post.save();
        }).then(post => {
            return res.sendStatus(200);
        }).catch(err => {
            console.log(err.message);
        })
    } else {
        res.sendStatus(401).send('User must be signed in to do that');
    }

})


/////Down Votes Route *******
// app.put('/posts/:id/vote-down', (req, res) => {
//     if(req.user) {
//         Post.findById(req.params.id).exec(post => {
//             console.log('this is the post -----> ' + post)
//             post.downVotes.push(req.user._id)
//             post.voteScore = post.voteScore - 1;
//             post.save();
//             res.sendStatus(200);
//         })
//     } else {
//         return res.sendStatus(401).send('You need to be logged in to do that!');
//     }
//
// })

app.put('/posts/:id/vote-down', (req, res) => {
    if(req.user) {
        Post.findById(req.params.id).then(post => {
            post.downVotes.push(req.user._id);
            post.voteScore = post.voteScore - 1;
            return post.save();
        }).then(post => {
            return res.sendStatus(200);
        }).catch(err => {
            console.log(err.message)
        })
    } else {
        res.sendStatus(401).send('You need to be signed in to do that!')
    }

})






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
