const User = require('../models/user');

// login user
const loginUser = async (req, res) => {
    res.send({ msg: 'login user' })
}

// signup user
const signupUser = async (req, res) => {
    res.send({ msg: 'signup user' })
}

module.exports = { loginUser, signupUser }