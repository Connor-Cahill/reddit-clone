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
    res.clearCookie('Token');
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
    //
    user.password = user.generateHash(req.body.password);

    user.save().then(user => {
        console.log(user);
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '60 days'});
        res.cookie('Token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
        return res.redirect('/');
    }).catch(err => {
        console.log(err.message);
    })
});


app.post('/login', (req, res) => {

    //find this username
    User.findOne({username: req.body.username}).then(user => {
        console.log(req.body);
        console.log(user)
        if (!user) {

            console.log('Username not found')
            return res.sendStatus(401).send('Wrong username or password');
        } else if (!user.comparePassword(req.body.password)) {
            console.log('Wrong password ');
            return res.sendStatus(401).send('Incorrect username or password.')

        } else {
            console.log('in else statement----');
            //create token  ------
            const token = jwt.sign({_id: user._id, username: user.username }, process.env.SECRET,{expiresIn: '60 days'});
            //set cookie / redirect to route
            res.cookie('Token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
            res.redirect('/');
        }

    }).catch(err => {
        console.log(err.message);
    })
    })
}
