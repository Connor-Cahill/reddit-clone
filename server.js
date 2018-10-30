const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const postController = require('./controllers/posts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const commentController = require('./controllers/comments-controller');
const authController = require('./controllers/auth');
const repliesController = require('./controllers/replies');
const bcrypt = require('bcrypt-nodejs');
///setup cookie parser
app.use(cookieParser());





mongoose.Promise = global.Promise



const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.Token === 'undefined' || req.cookies.Token === null) {
        req.user = null;
    } else {
        const token = req.cookies.Token;
        const decodedToken = jwt.decode(token, { complete: true}) || {};
        req.user = decodedToken.payload;
    }
    next();
}
app.use(checkAuth);

app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

///// Initialize Controllers
commentController(app);
postController(app)
authController(app);
repliesController(app);
///hello world route
// app.get('/', (req, res) => {
//     res.render('home');
// })





app.listen(port, () => {
    console.log(`App listening on localhost ${port}`);
})

module.exports = app;
