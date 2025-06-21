const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET: Dogs owned by the logged in user
router.get('/mine', async (req)