const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = function(app) {
/*************************
GET ROUTES
*************************/


//signup form
app.get('/sign-up', (req, res) => {
    res.render('sign-up.handlebars');
});

//LOGOUT
app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
})

//LOGIN
app.get('/login', (req, res) => {
    res.render('login.handlebars')
})


/*****************
POST ROUTES
*****************/
app.post('/sign-up', (req, res) => {
    //create user
    const user = new User(req.body);
    ///save user
    user.save().then((user) => {
        // console.log(user);
        let token = jwt.sign({_id: user._id}, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        res.redirect('/');
    }).catch(err => {
        console.log(err.message);
        return res.status(400).send({ err: err });
    });
});

///LOGIN POST ------- This route is unfinished, need to add comparePassword Method  --- maybe switch to bcrypt-node

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //find this username
    User.findOne({username}, 'username password').then((user) => {
        if (! user) {
            //if not user
            return res.status(401).send({message: 'Wrong Username or Password'});
        }
        //create token  ------
        const token = jwt.sign(
            {_id: user._id, username: user.username }, process.env.SECRET,
            {expiresIn: '60 days'}
        );
        //set cookie / redirect to route
        res.cookie('nToken', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
        res.redirect('/');
    }).catch(err => {
        console.log(err.message);
    })
})


}
