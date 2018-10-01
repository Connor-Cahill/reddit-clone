const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const postController = require('./controllers/posts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const commentController = require('./controllers/comments-controller');
const authController = require('./controllers/auth');
///setup cookie parser
app.use(cookieParser());





mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/reddit-clone', {useNewUrlParser: true})
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
commentController(app);
postController(app);
authController(app);
///hello world route
// app.get('/', (req, res) => {
//     res.render('home');
// })

app.listen(port, () => {
    console.log(`App listening on localhost ${port}`);
})
