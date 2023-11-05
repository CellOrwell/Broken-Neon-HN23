const game = require("./index");
const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;


app.use(cors());


app.use(express.json());

app.get('/api/getInfo', (req, res) => {
    const data = {
        message: game.getAllPrint(),
    }
    res.json(data);
});

app.get('/api/getChoices', (req, res) => {
    const data = {
        message: game.printAllOptions(),
    }
    res.json(data);
});

app.post('/api/giveUserAnswer', (req, res) => {
    const answer = req.body.choice;
    game.processUserData(answer);
    if(game.checkIfEnd()) {
        res.json({status: "ended"});
    }
    
    res.json({status: "running"});
});

app.get('/api/resetGame', (req, res) => {
    game.resetNewChoice();
    res.json({status: "done"});
});

app.listen(port, () => {
    console.log("Local API running on http://localhost:" + port);
});

