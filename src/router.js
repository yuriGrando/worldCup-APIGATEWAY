const express = require('express');
const router = express.Router();
const axios = require('axios');

let teamResponse;

// ======= REQ ========
router.get('/team', (req, res) => {
    axios({
        method: 'get',
        url: 'http://api.cup2022.ir/api/v1/team',
    }).then(function (response) {
        teamResponse = response.data;
    });
    res.status(200).send(teamResponse);
});

module.exports = router