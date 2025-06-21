const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET: Registered dogs
router.get('/', async (req,res) => {
    try {
        const [allDogs] = await db.query('SELECT dog_id, name, size, owner_id FROM Dogs');
        res.json(allDogs);
    } catch (err) {
        console.error('Error fetching registered dogs:', err);
        res.status(500).json({ error: 'Failed to load registered dogs.' });
    }
});

// GET: Dogs owned by the logged in user
router.get('/owned', async (req, res) => {
    const ownerId = req.session.userID;

    if (!ownerId) {
        return res.status(401).json({ error: 'Unauthorized user.' });
    }

    try {
        const [dogs] = await db.query(
            'SELECT dog_id, name FROM Dogs WHERE owner_id = ?',
            [ownerId]);
        res.json(dogs);
    } catch (err) {
        console.error('Error fetching user dogs', err);
        res.status(500).json({ error: 'Failed to load user dogs.' });
    }
});

module.exports = router;