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

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY5MDljMTZjYWNjMDZmNDhlYWVkM2QiLCJpYXQiOjE2NjgxMjk4NDIsImV4cCI6MTY2ODIxNjI0Mn0.FEtUJEBvH2hmkAxVu5sluYS2M3Llh0Egfur4cxC34Mc'
let login = {
    email: 'yv.grando@gmail.com',
    password: '1o*18*v9*'
}

const getToken = cron.schedule('* 29 22 * * *', () => {
    console.log('oi')
    axios.post('http://api.cup2022.ir/api/v1/user/login', login).then((res)=>{
        console.log('OK')
        token = res.data.data.token;
        console.log(token)
        getToken.stop()
    }).catch((err)=>{
        console.log('erro')
        console.log(err)
    })

}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});

// function getToken() {
//     return (async () => {
//         try {
//             await axios.post('http://api.cup2022.ir/api/v1/user/login', login).then((res)=>{
//                 console.log('OK')
//                 token = res.data.data.token;
//                 console.log(token)
//                 stop = true;
//             })
//
//         } catch (error) {
//             return error.response.status;
//         }
//     })();
// }

axios.defaults.headers.common =
    {'Authorization': `Bearer ${token}`}
;

app.use(router);

module.exports = app;