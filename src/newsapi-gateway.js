const router = require('express').Router()
const request = require('request-promise-native');
const { getToken } = require('./utils/token.util');



router.all('*', async (req, res, next) => {
    const path = req.originalUrl.slice(9);
    const apiKey = "5f4abeb55e6346be9fc14dd577e45134"
    const uri = `https://newsapi.org/v2/${req.url}&apiKey=${apiKey}`;

    /** @type {request.RequestPromiseOptions} options */
    const options = {
        headers: {"User-Agent": req.get('User-Agent'), "Content-Type":"application/json"},
        uri: uri,
        method: req.method,
    };

    try {
        const response = await request(options);
        res.json(JSON.parse(response));
    } catch (err) {
        return res.status(400).send({
            message: "Ocorreu um erro, fodase",
            data: err
        });
    }
})

module.exports = router;