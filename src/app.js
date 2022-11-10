const express = require('express')
const app = express();
const router = require('./router')
const cors = require('cors');
const midlleware = require('./middleware');
const axios = require('axios');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:4200"],
    credentials: true
}))

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY5MDljMTZjYWNjMDZmNDhlYWVkM2QiLCJpYXQiOjE2NjgwNDEyMTcsImV4cCI6MTY2ODEyNzYxN30.4w_uIllu4_E6b-IYd_-EK0duBZysPTgWNGzZ8PfnFfY'





axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token };

app.use(router);

 // app.use(midlleware)

module.exports = app;