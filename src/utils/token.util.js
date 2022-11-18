const axios = require('axios');
const mongoose = require('mongoose');
const jwtDecode = require("jwt-decode");
const cron = require('node-cron');

mongoose.connect("mongodb+srv://vito:vito@rchcluster.6aua2ce.mongodb.net/rchme_database?retryWrites=true&w=majority");

const SESSION_SCHEMA = new mongoose.Schema(
    {
        api: { type: String, required: true },
        token: { type: String, default: true },
    },
    {
        collection: "gateway-token",
        timestamps: true,
    }
);
const tokenModel = mongoose.model("gateway-token", SESSION_SCHEMA);

function scheduleFromToken(token) {
    const decoded = jwtDecode(token);
    const date = new Date(decoded.exp * 1000);

    const day = date.getDate();
    const month = date.getMonth();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const schedule_date = `* ${minute} ${hour} ${day} ${month + 1} *`;

    console.log("Novo cronograma para: ", schedule_date)

    cron.schedule(schedule_date, getToken, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    });
}

const tryJwtExpiration = async () => {
    const query = await tokenModel.findOne({ api: "worldcup2022-api" }, {}, { lean: false });
    const decoded = jwtDecode(query.token);
    if (decoded.exp && Date.now() > decoded.exp * 1000) {
        console.log("Gera o token e schedula para o tempo de expiraçao dele", new Date(decoded.exp * 1000));

        getToken().then((resp) => {
            // schedula de acordo com novo token
            scheduleFromToken(resp.newToken)
        });
    } else {
        // schedula para data de expiracao restante
        axios.defaults.headers.common = { 'Authorization': `Bearer ${query.token}` }
        scheduleFromToken(query.token);
    }
};

const getToken = async () => {
    const query = await tokenModel.findOne({ api: "worldcup2022-api" }, {}, { lean: false });
    return new Promise((resolve, reject) => {
        let login = {
            email: 'yv.grando@gmail.com',
            password: '1o*18*v9*'
        }
        axios.post('http://api.cup2022.ir/api/v1/user/login', login)
            .then((res) => {
                token = res.data.data.token;
                axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
                query.set({ token: token })
                resolve({ newToken: token });
            }).catch((err) => {
                reject(err);
            })
    })
}

module.exports = { getToken, tryJwtExpiration }