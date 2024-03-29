const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// static signup method
UserSchema.statics.signup = async function (username, email, password) {
    
    // validation
    if (!username || !email || !password) {
        throw Error('All fields must be filled!');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid!');
    }

    const usernameExists = await this.findOne({ username });
    const emailExists = await this.findOne({ email });

    if (usernameExists) {
        throw Error('Username already in use! Try another username!');
    }
    if (emailExists) {
        throw Error('Email already in use!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash });

    return user;
}

// static login method
UserSchema.statics.login = async function (username, password) {
    
    if (!username || !password) {
        throw Error('All fields must be filled!');
    }

    const user = await this.findOne({ username });

    if (!user) {
        throw Error('Invalid login credentials!');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Invalid login credentials!');
    }

    return user;
}

module.exports = mongoose.model('User', UserSchema)