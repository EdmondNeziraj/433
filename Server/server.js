const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Match = require('./models/match');

mongoose.connect('mongodb://localhost:27017/4-3-3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database connected");
});

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
    res.send('hello from home');
})

app.get('/matches', (req, res) => {
    res.send('hello from matches')
})

app.get('/makematch', async (req, res) => {
    const match = new Match({ title: 'camp nou'});
    await match.save();

    res.send(match);
})

app.get('/host', (req, res) => {
    res.send('hello from host')
})

const port = 5000;
app.listen(port, () => {
    console.log(`server on port ${port}`)
})