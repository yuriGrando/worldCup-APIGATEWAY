const router = require('express').Router()
const httpProxy = require('express-http-proxy');

const worldcupProxy = httpProxy("http://api.cup2022.ir"); 

router.all('*', (req, res, next) => worldcupProxy(req, res, next))

module.exports = router