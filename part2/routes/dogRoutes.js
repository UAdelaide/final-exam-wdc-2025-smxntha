const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET: Dogs owned by the logged in user
router.get('/owned', async (req, res) => {
    const ownerId = req.session.userID;

    if (!ownerId) {
        return res.status(401).json({ error: 'Unauthorized user. '});
    }

    try {
        const [dogs] = await db.query(
            'SELECT * FROM DOG'
        )
    }
});