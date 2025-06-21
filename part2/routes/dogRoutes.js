const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET: Dogs owned by the logged in user
router.get('/owned', async (req, res) => {
    const ownerId = req.session.userID;
    console.log('ownerId:', req.session.userID);

    if (!ownerId) {
        return res.status(401).json({ error: 'Unauthorized user.' });
    }

    try {
        const [dogs] = await db.query(
            'SELECT * FROM Dogs where owner_id = ?',
            [ownerId]);
        res.json(dogs);
    } catch (err) {
        console.error('Error fetching user dogs', err);
        res.status(500).json({ error: 'Failed to load user dogs.' });
    }
});

module.exports = router;