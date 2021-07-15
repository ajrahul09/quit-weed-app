const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const dailyLogRoute = require('./routes/dailyLog');
const imagesRoute = require('./routes/images');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('Connected to db!')
);

// Middleware
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/dailyLog', dailyLogRoute);
app.use('/api/uploadImage', imagesRoute);

app.listen(3000, () => console.log('Server Up and running'));

