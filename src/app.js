const express = require('express')
const app = express();
const router = require('./router')
const cors = require('cors');

const wordlGateway = require('./worldcup-gateway');
const newsapiGateway = require('./newsapi-gateway');
const { tryJwtExpiration } = require('./utils/token.util')


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:4200"],
    credentials: true
}));

global.sexo = "pau"

tryJwtExpiration();

// app.use(router);
app.use("/wordlcup", wordlGateway);
app.use("/newsapi", newsapiGateway);

module.exports = app;