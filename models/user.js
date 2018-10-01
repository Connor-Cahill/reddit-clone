const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone', {useNewUrlParser: true});
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    password: {type: String, select: false},
    username: {type: String, required: true}
});

UserSchema.pre('save', function(next) {
    ///SET created at and updated at
    const now = new Date();
    this.updateAt = now;
    if (!this.createdAt ) {
        this.createdAt = now;
    }

    ///ENCRYPT PASSWORD
    const user = this;
    if (! user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            
            next();
        });
    });
});
UserSchema.methods.comparePassword = (password, done) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
