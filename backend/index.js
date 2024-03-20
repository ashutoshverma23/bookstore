import express from 'express';
import { PORT, MONGO_URI } from './config.js';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
//cors is cross origin resource sharing
//it is used to share the resources between different origins
//here in cors, i can add the url of the frontend and methods like get, post, put, delete
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type']
}));

//url par output dene ke liye
//get is used to fetch data from database
app.get('/', (req, res) => {
    res.send('Hello World');
});

//books ke routes ko use karne ke liye
app.use('/books', bookRoutes);



//server ko listen karne ke liye
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




//connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error:', error);
    });