const express = require('express');
const Match = require('../models/match');
const {
    getMatches,
    getMatch,
    createMatchForm,
    createMatch,
    updateMatchForm,
    updateMatch,
    deleteMatch
} = require('../controllers/matchController')

const router = express.Router();

// GET all matches
router.get('/', getMatches)

// GET a sigle match
router.get('/:id', getMatch)

// GET the form to create match
router.get('/new', createMatchForm)

// CREATE a new match
router.post('/', createMatch)

// GET the form to update a match
router.get('/:id/edit', updateMatchForm)

// UPDATE a match
router.patch('/:id', updateMatch)

// DELETE a workout
router.delete('/:id', deleteMatch)

module.exports = router