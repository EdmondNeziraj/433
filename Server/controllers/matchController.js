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
    res.send(html);
    // res.send(matches);
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

    res.send(match);
}

// GET the form to create match
const createMatchForm = (req, res) => {
    console.log("hello from new match form")
    res.send(`
        <div className="App">
                <form action="/matches" method="POST">
                    <div>
                        <label>
                            Location
                            <input type="text" name="match[location]"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Time
                            <input type="text" name="match[time]"/>
                        </label>
                    </div>
                    <button>Create Match</button>
                </form>
                <a href="/matches">all matches</a>
            </div>
    `)
}

// CREATE a new match
const createMatch =  async (req, res) => {
    const {location, maxPlayers, currentPlayers, time, duration} = req.body;

    // add doc to db
    try {
        const match = await Match.create({location, maxPlayers, currentPlayers, time, duration})
        res.send(match);
    } catch (error) {
        res.send({error: error.message})
    }
    // console.log(req.body.match)
    // const match = new Match(req.body.match);
    // await match.save();
    // console.log(`save match ${match} in db`);
    // res.redirect(`/matches/${match._id}`);
}

// GET the form to update a match
const updateMatchForm = async (req, res) => {
    const match = await Match.findById(req.params.id)
    res.send(`
        <div className="App">
            <h1>edit</h1>
            <form action="/matches/${match._id}?method=PUT" method="POST">
                <div>
                    <label>
                        Location
                        <input type="text" name="match[location]" value="${match.location}"/>
                    </label>
                </div>
                <div>
                    <label>
                        Time
                        <input type="text" name="match[time]" value="${match.time}"/>
                    </label>
                </div>
                <button>Update Match</button>
            </form>
            <a href="/matches/${match._id}">back to match</a>
        </div>
    `)
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
    res.send(match);
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

    res.send(match);
}

module.exports = {
    getMatches,
    getMatch,
    createMatchForm,
    createMatch,
    updateMatchForm,
    updateMatch,
    deleteMatch
}