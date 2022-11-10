const express = require('express');
const router = express.Router();

// ======= IMPORTS JSON ========
const match = require("./data/match.json");
const team = require("./data/team.json");
const standings = require("./data/standings.json");

// ======= REQ ========
router.get('/match', (req, res) => res.status(200).send(res.json(match)));

router.get('/team', (req, res) => res.status(200).send(res.json(team)));

router.get('/match', (req, res) => res.status(200).send(res.json(standings)));

module.exports = router