import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

// Defining MongoDB URL
const mongoURL = process.env.MONGODB_URL;


// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('Error in MongoDB connection', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

export default db;
