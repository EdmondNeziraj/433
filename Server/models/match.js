const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    title: String,
    location: String,
    players: Number
});

module.exports = mongoose.model('Match', MatchSchema)