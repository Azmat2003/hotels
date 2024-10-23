import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import Person from './models/Persons.js';
import MenuItem from './models/MenuItem.js';
import router from './routes/personRoutes.js';

import dotenv from 'dotenv'
dotenv.config();


const app = express();
const port = process.env.PORT || 3000; 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World, Welcome to our Hotet");
})

// import route files
import personRoutes from './routes/personRoutes.js'
app.use('/person', personRoutes);

import menuRoutes from './routes/menuRoutes.js'
app.use('/menu', menuRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});