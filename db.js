import mongoose from 'mongoose';

// Defining MongoDB URL
const mongoURL = 'mongodb://localhost:27017/mydb1';

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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