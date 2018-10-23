const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone', {useNewUrlParser: true});

const Schema = mongoose.Schema

const CommentSchema = new Schema ({
    content: { type: String, required: true },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]

})


const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment;
