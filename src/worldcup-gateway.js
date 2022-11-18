const router = require('express').Router()
const request = require('request-promise-native');
const axios = require("axios");
const { getToken } = require('./utils/token.util');

function handleAuthErrors(response, options) {
    try {
        getToken().then(async (resp) => {
            options.headers = axios.defaults.headers.common;
            const data = await request(options);
            resolveResponse(response, data);
        }).catch((err) => {
            response.status(500).send(err);
        });
    } catch (err) {
        response.send(err);
    }
}

function resolveResponse(response, data) {
    response.json(JSON.parse(data))
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
        resolveResponse(res, response);
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
