const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt'); // for password hashing

// POST: login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [userRows] = await db.query('SELECT * FROM Users WHERE username = ?',
            [username]
        );

        if (userRows.length === 0) {
            
        }
    } catch (err) {

    }
});