const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    location: String,
    maxPlayers: Number,
    currentPlayers: Number,
    time: String,
    duration: Number
});

module.exports = mongoose.model('Match', MatchSchema)