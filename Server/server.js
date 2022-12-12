const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Match = require('./models/match');

// connect the database to the server
mongoose.connect('mongodb://localhost:27017/4-3-3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database connected");
});

// initialize the server
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('method'));

// routes
app.get('/', (req, res) => {
    res.send('hello from home');
})

app.get('/home', (req, res) => {
    res.send('hello from home');
})

app.get('/matches', async (req, res) => {
    let html = '<a href="/host">host a match</a><ul>';
    const matches = await Match.find({});
    for (let match of matches) {
        html += `<li><a href="/matches/${match.id}">${match.location}</a></li>`
    }
    html += '</ul>';
    // res.send(html);
    res.send(matches);
})

app.get('/host', (req, res) => {
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
})

app.post('/matches', async (req, res) => {
    console.log(req.body.match)
    const match = new Match(req.body.match);
    await match.save();
    console.log(`save match ${match} in db`);
    res.redirect(`/matches/${match._id}`);
})

app.get('/matches/:id', async (req, res) => {
    const match = await Match.findById(req.params.id)
    res.send(`
    <h1>view</h1>
    <div>details of match <b>${match.location}</b> with id <b>${req.params.id}</b></div>
    <form action="/matches/${match._id}?method=DELETE" method="POST"><button>Delete</button></form>
    <a href="/matches/${match._id}/edit">edit match</a>
    <div><a href="/matches">all matches </a></div>`);
})

app.get('/matches/:id/edit', async (req, res) => {
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
})

app.put('/matches/:id', async (req, res) => {
    const { id } = req.params;
    const match = await Match.findByIdAndUpdate(id, { ...req.body.match }); 
    res.redirect(`/matches/${match._id}`);
})

app.delete('/matches/:id', async (req, res) => {
    const { id } = req.params;
    await Match.findByIdAndDelete(id);
    res.redirect('/matches');
})

const port = 5000;
app.listen(port, () => {
    console.log(`server on port ${port}`)
})