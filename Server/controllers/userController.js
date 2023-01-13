const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' });
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id);

        // get user id
        const userId = user._id;

        res.status(200).send({ email, userId, token })
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

// signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signup(username, email, password);

        // create token
        const token = createToken(user._id);

        // get user id
        const userId = user._id;

        res.status(200).send({ username, email, userId, token })
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = { loginUser, signupUser }