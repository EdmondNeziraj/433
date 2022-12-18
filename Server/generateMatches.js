const mongoose = require('mongoose');
const Match = require('./models/match');

// mongoose.connect('mongodb://localhost:27017/4-3-3', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// connect the database to the server
mongoose.connect('mongodb+srv://edmond:edmond@cluster0.csoevyt.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})



const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database connected");
});

data = [
    {
        title: "Pelham Bay Parkk, Bronx",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "3278 Middletown Rd",
        city: "Bronx",
        state: "New York",
        zip: 10465,
        author: 'John',
        latitude: 40.849001553062116,
        longitude: -73.82333658644508,
    },
    {
        title: "Van Cortland Park, Bronx",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "Van Cortlandt Park S & Putnam Ave W",
        city: "Bronx",
        state: "New York",
        zip: 10463,
        author: 'Ana',
        latitude: 40.888170131183344,
        longitude: -73.89724025821344,
    },
    {
        title: "Sunset Park, Brooklyn",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "7th Avenue & 43rd St",
        city: "Brooklyn",
        state: "New York",
        zip: 11232,
        author: 'Ana',
        latitude: 40.646996039572,
        longitude: -74.00210303898075,
    },
    {
        title: "Pier 40, Manhattan",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "353 West St",
        city: "New York",
        state: "New York",
        zip: 10014,
        author: 'Joshua',
        latitude: 40.729566721848464,
        longitude: -74.01261886832702,
    },
    {
        title: "Socceroof, Queens",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "36-39 35th St",
        city: "Queens",
        state: "New York",
        zip: 11106,
        author: 'Alexis',
        latitude: 40.7567113329677,
        longitude: -73.9222115289144,
    },
    {
        title: "Bushwick Inlet Park, Brooklyn",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "86 Kent Avenue",
        city: "Brooklyn",
        state: "New York",
        zip: 11249,
        author: 'Rukhshan',
        latitude: 40.72277702933632,
        longitude: -73.96130482709647,
    },
    {
        title: "McCarren Park, Brooklyn",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "769 Lorimer St",
        city: "Brooklyn",
        state: "New York",
        zip: 11222,
        author: 'Jorge',
        latitude: 40.720164975598735,
        longitude: -73.95074218543178,
    },
    {
        title: "Riverside Park, Manhattan",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "Riverside Dr & W 104th St",
        city: "New York",
        state: "New York",
        zip: 10025,
        author: 'Maria',
        latitude: 40.80150433672489,
        longitude: -73.97318361549613,
    },
    {
        title: "Battery Park City, Manhattan",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "201 Warren St",
        city: "New York",
        state: "New York",
        zip: 10282,
        author: 'Keshav',
        latitude: 40.716203494525885,
        longitude: -74.01377620013696,
    },
    {
        title: "Macombs Dam Park, Bronx",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "E 157 St & W 161st St",
        city: "Bronx York",
        state: "New York",
        zip: 10451,
        author: 'Suriel',
        latitude: 40.82772705489088,
        longitude: 73.92974464615764,
    },
    {
        title: "Brooklyn Bridge Park, Pier 5, Brooklyn",
        maxPlayers: 10,
        currentPlayers: 6,
        time: "19:00",
        date: "2022-12-20",
        duration: 60,
        address: "334 Furman St",
        city: "Brooklyn",
        state: "New York",
        zip: 11201,
        author: 'Jamie',
        latitude: 40.69506410755502,
        longitude: -74.00171747314938,
    },
]

const seedDB = async () => {
    await Match.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        const match = new Match({
            title: data[i].title,
            maxPlayers: data[i].maxPlayers,
            currentPlayers: data[i].currentPlayers,
            time: data[i].time,
            date: data[i].date,
            duration: data[i].duration,
            address: data[i].address,
            city: data[i].city,
            state: data[i].state,
            zip: data[i].zip,
            host: '639d904483f4c2ba00a407b7',
            latitude: data[i].latitude,
            longitude: data[i].longitude,
        })
        await match.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});