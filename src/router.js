const express = require('express');
const router = express.Router();
const axios = require('axios');

// ======= REQ ========
router.get('/team', async (req, res) => {
    const response = await getApiData();
    res.status(200).send(response);
});

function getApiData() {
    return (async () => {
        try {
            const response = await axios.get('http://api.cup2022.ir/api/v1/team')
            return response.data;
        } catch (error) {
            return `Status ${error.response.status}: Muitas Requisições`;
        }
    })();
}

module.exports = router