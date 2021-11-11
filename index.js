const express = require('express');
const app = express();

//port setup
const port = process.env.port || 3000;

//import routes 
const userRoutes = require('./routes/userRouter');

app.use(express.json());

//route declaration
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Wrong Endpoint');
});

const server = require('http').createServer(app);

server.listen(port, () => {
    console.log("Server is started")
})