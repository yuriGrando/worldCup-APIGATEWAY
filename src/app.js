const express = require('express')
const app = express();
const router = require('./router')
const cors = require('cors');
const midlleware = require('./middleware');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:4200"],
    credentials: true
}))

app.use(router);

 // app.use(midlleware)

module.exports = app;