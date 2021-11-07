import express from 'express';
import authRoute from './routes/auth'
import connectDB from './db/connect';
require('dotenv').config();
import posts from './routes/posts';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/user', posts);

// db
const start = async () => {
    try {
        await connectDB(process.env.DB_URL);
        app.listen(port, () => console.log(`listing at ${port}`));
    }catch(err){
        console.log(err);
    }
}
start();
