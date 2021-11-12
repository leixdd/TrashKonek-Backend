const express = require('express');
const app = express();
const _env = require('dotenv');
const mongoose = require('mongoose');

_env.config();

//port setup
const port = process.env.PORT || 3000;

//connect to mongodb
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

//import routes 
const userRoutes = require('./routes/userRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//route declaration
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Wrong Endpoint');
});

const server = require('http').createServer(app);

server.listen(port, () => {
    console.log(`Server is started at PORT: ${port}`)
});