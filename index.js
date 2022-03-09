const express = require('express');
const app = express();
const _env = require('dotenv');
const mongoose = require('mongoose');
const passport_auth = require('./src/services/authService');
const { Server } = require('socket.io');

_env.config();

//port setup
const port = process.env.PORT || 3000;

//connect to mongodb
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`);

//import routes 
const userRoutes = require('./routes/userRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//initialize passport
passport_auth.initPassport(app);

//route declaration
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Wrong Endpoint');
});

const server = require('http').createServer(app);
const io = new Server(server);

server.listen(port, () => {
    console.log(`Server is started at PORT: ${port}`)
});