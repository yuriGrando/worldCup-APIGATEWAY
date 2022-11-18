const express = require('express')
const app = express();
const router = require('./router')
const cors = require('cors');

const worldGateway = require('./worldcup-gateway');
const newsapiGateway = require('./newsapi-gateway');
const { tryJwtExpiration } = require('./utils/token.util')


app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

global.sexo = "pau"

tryJwtExpiration();

// app.use(router);
app.use("/worldcup", worldGateway);
app.use("/newsapi", newsapiGateway);

module.exports = app;