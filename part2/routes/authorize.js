const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt'); // for password hashing

// POST: login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [userRows] = await db.
    } catch (err) {

    }
});