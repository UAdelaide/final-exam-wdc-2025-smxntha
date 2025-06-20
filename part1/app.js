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

// GET: Open walk requests, include dog name, requested time, location and owner username
app.get('/api/walkrequests/open', async (req, res) {
    try {
        const [openReqRows] = await pool.query(
            `SELECT wr.request_id, d.name AS dog_name, wr.requested_time, wr.duration_minutes, wr. location,
            u.username AS owner_username
            FROM WalkRequests wr
            JOIN Dogs d ON wr.dog_id = d.dog_id
            JOIN Users u ON d.owner_id = u.user_id
            WHERE wr.status = 'open';`
        );
        res.json(openReqRows);
    } catch (err) {
        res.status(500).json({ 'Failed to fetch open Walk Requests', err }); 
    }
});