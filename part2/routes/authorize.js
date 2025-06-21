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

        // if username not found
        if (userRows.length === 0) {
            return res.status(401).jason({ error: 'Username not found.' });
        }

        // check if passwords match
        const user = rows[0];
        const match = await bycrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401)/json({ error: 'Invalid password. '});
        }

        // if 
    } catch (err) {

    }
});