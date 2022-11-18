const router = require('express').Router()
const request = require('request-promise-native');
const axios = require("axios");
const { getToken } = require('./utils/token.util');

function handleAuthErrors(response, options) {
    try {
        getToken().then(async (resp) => {
            const res = await request(options);
            response.json(res);
        }).catch((err) => {
            response.statusCode(500).send(err);
        });
    } catch (err) {
        response.send(err);
    }
}

router.all('*', async (req, res, next) => {
    const path = req.originalUrl.slice(9);
    const uri = `http://api.cup2022.ir${path}`;

    /** @type {request.RequestPromiseOptions} options */
    const options = {
        headers: axios.defaults.headers.common,
        uri: uri,
        method: req.method,
    };

    try {
        const response = await request(options);
        res.json(response);
    } catch (err) {
        if (err.statusCode) {
            if (err.statusCode == 401) return handleAuthErrors(res, options);

            return res.status(err.statusCode).send({
                message: err.message
            });
        }
        return res.status(400).send({
            message: "Ocorreu um erro, fodase",
            data: err
        });
    }
})

module.exports = router;
