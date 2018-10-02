const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    title: {type: String, require: true},
    url: {type: String, require: true},
    summary: {type: String, require: true},
    subreddit: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true }

})
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
