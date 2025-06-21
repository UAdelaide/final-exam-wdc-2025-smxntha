const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt'); // for password hashing

