const express = require('express');
const router = express.Router();
const axios = require('axios');

// ======= REQ ========
let teamResponse = [];
let matchResponse = [];
let standingsResponse = [];

router.get('/team', async (req, res) => {
    teamResponse = await getApiData(teamResponse);
    res.status(200).send(teamResponse);
});

router.get('/match', async (req, res) => {
    matchResponse = await getApiData(matchResponse);
    res.status(200).send(matchResponse);
});

router.get('/standings', async (req, res) => {
    standingsResponse = await getApiData(standingsResponse);
    res.status(200).send(standingsResponse);
});

function getApiData(data) {
    return (async () => {
        try {
            const response = await axios.get('http://api.cup2022.ir/api/v1/team')
            return response.data;
        } catch (error) {
            return data;
        }
    })();
}

module.exports = router