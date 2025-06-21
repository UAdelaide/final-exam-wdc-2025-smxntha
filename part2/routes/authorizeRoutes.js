const express = require('express');
const router = express.Router();
const db = require('../models/db');

// POST: login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [userRows] = await db.query('SELECT * FROM Users WHERE username = ?',
            [username]
        );

        // if username not found
        if (userRows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // check if passwords match, since passwords are hardcoded, just do string comparison
        const user = userRows[0];

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // if login successful:

        // store session
        req.session.userID = user.user_id;
        req.session.role = user.role;

        // redirect user accordingly
        res.json({ role: user.role });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log in.' });
    }
});

module.exports = router;