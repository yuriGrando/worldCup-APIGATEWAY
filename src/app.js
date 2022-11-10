const express = require('express')
const app = express();
const router = require('./router')
const cors = require('cors');
const axios = require('axios');
const cron = require('node-cron');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:4200"],
    credentials: true
}))

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY5MDljMTZjYWNjMDZmNDhlYWVkM2QiLCJpYXQiOjE2NjgwNDEyMTcsImV4cCI6MTY2ODEyNzYxN30.4w_uIllu4_E6b-IYd_-EK0duBZysPTgWNGzZ8PfnFfY'

cron.schedule('* 45 17 * * *', () => {
    console.log('Gerando novo token');
    console.log(token)
    getToken();
},{
    scheduled: true,
    timezone: "America/Sao_Paulo"
});

function getToken() {
    return (async () => {
        try {
            const response = await axios.post('http://api.cup2022.ir/api/v1/user/login', {email: 'yv.grando@gmail.com', password: '1o*18*v9*'})
            token = response.data.token;
            console.log('entrou')
        } catch (error) {
            console.log('error')
            await getToken()
        }
    })();
}

axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token };

app.use(router);

module.exports = app;