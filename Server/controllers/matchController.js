const { default: mongoose } = require('mongoose');
const Match = require('../models/match');

// GET all matches
const getMatches = async (req, res) => {
    let html = '<a href="/host">host a match</a><ul>';
    const matches = await Match.find({});
    for (let match of matches) {
        html += `<li><a href="/matches/${match.id}">${match.location}</a></li>`
    }
    html += '</ul>';
    //res.send(html);
    res.status(200).send(matches);
}

// GET a single match
const getMatch = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({error: "No such match"});
    }
    const match = await Match.findById(id);

    // res.send(`
    // <h1>view</h1>
    // <div>details of match <b>${match.location}</b> with id <b>${req.params.id}</b></div>
    // <form action="/matches/${match._id}?method=DELETE" method="POST"><button>Delete</button></form>
    // <a href="/matches/${match._id}/edit">edit match</a>
    // <div><a href="/matches">all matches </a></div>`);

    if (!match) {
        return res.status(404).send({error: "No such match"});
    }

    res.status(200).send(match);
}

// CREATE a new match
const createMatch =  async (req, res) => {
    const {location, maxPlayers, currentPlayers, time, duration} = req.body;

    // add doc to db
    try {
        const match = await Match.create({location, maxPlayers, currentPlayers, time, duration})
        res.status(200).send(match);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
    // console.log(req.body.match)
    // const match = new Match(req.body.match);
    // await match.save();
    // console.log(`save match ${match} in db`);
    // res.redirect(`/matches/${match._id}`);
}

// UPDATE a match
const updateMatch = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({error: "No such match"});
    }

    console.log(id);

    const match = await Match.findByIdAndUpdate(id, { ...req.body }); 
    
    if (!match) {
        return res.status(404).send({error: "No such match"});
    }
    
    // res.redirect(`/matches/${match._id}`);
    res.status(200).send(match);
}

// DELETE a workout
const deleteMatch = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({error: "No such match"});
    }

    console.log(id);
    const match = await Match.findByIdAndDelete(id);
    // res.redirect('/matches');

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