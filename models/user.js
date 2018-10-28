const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone', {useNewUrlParser: true});
const bcrypt = require('bcrypt-nodejs');


const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    password: {type: String, required: true},
    username: {type: String, required: true},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
});

UserSchema.pre('save', function(next) {
    ///SET created at and updated at
    const now = new Date();
    this.updateAt = now;
    if (!this.createdAt ) {
        this.createdAt = now;
    }
    next();

});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}


const User = mongoose.model('User', UserSchema);
module.exports = User;
