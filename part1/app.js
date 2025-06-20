const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 8080;

// for database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
});

app.use(express.json());

// Route f