const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
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
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
    res.send('hello from home');
})

app.get('/home', (req, res) => {
    res.send('hello from home');
})

app.get('/matches', async (req, res) => {
    let html = '<ul>';
    const matches = await Match.find({});
    for (let match of matches) {
        html += `<li><a href="/matches/${match.id}">${match.location}</a></li>`
    }
    html += '</ul>';
    res.send(html);
})

app.get('/matches/new', (req, res) => {
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
    res.send(`details of match <b>${match.location}</b> with id <b>${req.params.id}</b>`);
})

app.get('/host', (req, res) => {
    res.send('hello from host')
})



const port = 5000;
app.listen(port, () => {
    console.log(`server on port ${port}`)
})