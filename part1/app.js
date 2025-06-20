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

// GET: List of all dogs (name and size_ and ownder username)
app.get('/api/dogs', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT d.name AS dog_name, d.size, u.username AS owner_username
            FROM Dogs d`
        )
    }
});