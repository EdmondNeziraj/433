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

data = [
    {
        location: "Pelham Bay Park, Bronx",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.849001553062116, 
        longitude: -73.82333658644508,
    },
    {
        location: "Van Cortland Park, Bronx",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.888170131183344, 
        longitude: -73.89724025821344,
    },
    {
        location: "Sunset Park, Brooklyn",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.646996039572, 
        longitude: -74.00210303898075,
    },
    {
        location: "Pier 40, Manhattan",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.729566721848464, 
        longitude: -74.01261886832702,
    },
    {
        location: "Astoria Indoor Soccer Field, Queens",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.7567113329677, 
        longitude: -73.9222115289144,
    },
    {
        location: "Bushwick Inlet Park, Brooklyn",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.72277702933632, 
        longitude: -73.96130482709647,
    },
    {
        location: "McCarren Park, Brooklyn",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.720164975598735, 
        longitude: -73.95074218543178,
    },
    {
        location: "Riverside Park, Manhattan",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.80150433672489, 
        longitude: -73.97318361549613,
    },
    {
        location: "Battery Park City, Manhattan",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.716203494525885, 
        longitude: -74.01377620013696,
    },
    {
        location: "Macombs Dam Park, Bronx",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.82772705489088, 
        longitude: 73.92974464615764,
    },
    {
        location: "Brooklyn Bridge Park, Pier 5, Brooklyn",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "7:00PM",
        data: 12/20/2022,
        duration: 60,
        latitude: 40.69506410755502, 
        longitude: -74.00171747314938,
    },
]

const seedDB = async () => {
    await Match.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        const match = new Match({
            location: data[i].location,
            maxPlayers: data[i].maxPlayers,
            currentPlayers: data[i].currentPlayers,
            time: data[i].time,
            duration: data[i].duration
        })
        await match.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});