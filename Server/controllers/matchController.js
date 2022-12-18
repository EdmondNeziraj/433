const { default: mongoose } = require('mongoose');
const Match = require('../models/match');

// GET all matches
const getMatches = async (req, res) => {
    const matches = await Match.find({});
    res.status(200).send(matches);
}

// GET a single match
const getMatch = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({error: "No such match found"});
    }
    const match = await Match.findById(id).populate('host');

    if (!match) {
        return res.status(404).send({error: "No such match found"});
    }

    res.status(200).send(match);
}

// CREATE a new match
const createMatch =  async (req, res) => {
    const { 
        title, 
        maxPlayers, 
        time, 
        date, 
        duration, 
        address, 
        city,
        state,
        zip,
        host
    } = req.body;

    // add doc to db
    try {
        const match = await Match.create({ 
            title, 
            maxPlayers, 
            time, 
            date, 
            duration, 
            address, 
            city,
            state,
            zip,
            host
        })
        res.status(200).send(match);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

// UPDATE a match
const updateMatch = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({error: "No such match"});
    }

    await Match.findByIdAndUpdate(id, { ...req.body }); 
    
    const updatedMatch = await Match.findById(id);
    if (!updatedMatch) {
        return res.status(404).send({error: "No such match"});
    }
        res.status(200).send(updatedMatch);
}

// DELETE a workout
const deleteMatch = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({error: "No such match"});
    }

    const match = await Match.findByIdAndDelete(id);

    if (!match) {
        return res.status(404).send({error: "No such match"});
    }

    res.status(200).send(match);
}

module.exports = {
    getMatches,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch
}