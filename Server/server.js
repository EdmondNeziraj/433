require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const matchRoutes = require('./routes/matches');
const userRoutes = require('./routes/user');

const db_url = process.env.DB_URL;

// connect the database to the server
mongoose.connect(db_url, {
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

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('method'));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes

app.get('/', (req, res) => {
    res.send('hello from home');
})

app.get('/home', (req, res) => {
    res.send('hello from home');
})

app.use('/matches', matchRoutes);

app.use('/user', userRoutes);

app.get('/api', async (req, res) => {
    // const data = await fetch('https://pokeapi.co/api/v2/pokemon/4')
    const data = await fetch('https://api.weatherapi.com/v1/forecast.json?key=3269e5b1c838479f82a51845221712&q=10462&dt=2022-12-29')
    const json = await data.json();

    const day = json.forecast.forecastday[0].day;

    console.log(`average temp in C: ${day.avgtemp_c}, condition: ${day.condition.text}`);
    res.send(day);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server on port ${port}`)
})