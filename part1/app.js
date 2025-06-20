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
        const [dogRows] = await pool.query(
            `SELECT d.name AS dog_name, d.size, u.username AS owner_username
            FROM Dogs d
            JOIN Users u ON d.owner_id = u.user_id;`
        );
        res.json(dogRows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching dog information', err });
    }
});

// GET: Open walk requests 