const express = require('express')
const cors = require('cors')
const midlleware = require('./middleware')

//====== ARQUIVOS JSON =======
const team = require('./data/team.json');
const match = require('./data/match.json');
const standings = require('./data/standings.json');

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:4200"],
  credentials: true
}))

// app.use(midlleware)

//======= REQ GET ========
app.get('/team', (req, res) => {
  return res.json(team);
});

app.get('/match', (req, res) => {
  return res.json(match);
});

app.get('/standings', (req, res) => {
  return res.json(standings);
})


app.listen(3000, () => {
  console.log("port 3000");
});