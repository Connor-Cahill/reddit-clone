const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone', {useNewUrlParser: true});
const Comment = require('./comment');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    createdAt: {type: String},
    title: {type: String, require: true},
    url: {type: String, require: false},
    summary: {type: String, require: true},
    subreddit: { type: String, require: true },
    author: {type: Schema.Types.ObjectId, ref: 'User', require: true },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    upVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    voteScore: {type: Number, default: 0}


})

PostSchema.pre('save', function(next) {
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const now = `${month}/${day}/${year}`
    this.createdAt = now;
    next();

})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
