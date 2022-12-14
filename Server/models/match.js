const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number,
        // required: true
    },
    currentPlayers: {
        type: Number,
        // required: true
    },

    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        // required: true
    }
});

module.exports = mongoose.model('Match', MatchSchema)