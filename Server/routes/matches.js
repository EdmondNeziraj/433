const express = require('express');
const Match = require('../models/match');

const {
    getMatches,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch
} = require('../controllers/matchController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();



// GET all matches
router.get('/', getMatches)


// GET a single match
router.get('/:id', getMatch)

// CREATE a new match
router.post('/', requireAuth, createMatch)

// UPDATE a match
router.patch('/:id', requireAuth, updateMatch)

// DELETE a workout
router.delete('/:id', requireAuth, deleteMatch)



module.exports = router