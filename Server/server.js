const express = require('express');
const path = require('path');
const cors = require('cors');

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

app.get('/host', (req, res) => {
    res.send('hello from host')
})

const port = 5000;
app.listen(port, () => {
    console.log(`server on port ${port}`)
})