import express from "express";


const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('hello from 4-3-3')
})

app.listen(port, () => {
    console.log(`server on port ${port}`)
})