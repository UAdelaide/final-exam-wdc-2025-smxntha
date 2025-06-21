const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

/* -- SESSION SET UP --  */
const session = require('express-session');

app.use(session({
    secret: 'dogWalkerSecret', // hardcode
    resave: false,
    saveUninitialized: false
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authorizeRoutes'); // add route for authorizations
const dogRoutes = require('.')

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes); // mount for logins

// Export the app instead of listening here
module.exports = app;