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
app.use(express.static(path.join(__dirname, 'build')));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.get('/', function (req, res) {
    console.log('path', path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// routes
app.get('/', (req, res) => {
    res.send('hello from home');
})

app.use('/api/matches', matchRoutes);

app.use('/api/user', userRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server on port ${port}`)
})
