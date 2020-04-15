const express = require('express');
const router = express.Router();
const Player = require('../models/player');

router.post('/add/new',(req, res)=>{
	let newPlayer = new Player({
		jerseyId: req.body.jerseyId,
		name: req.body.name,
		dob: req.body.dob,
        doj: req.body.doj,
        team: req.body.team
    });

    Player.addPlayer(newPlayer,(err, player) =>{
        if(err){
            res.json({success: false, msg:"Failed to add Player"});
        } else{
            res.json({success: true, msg:"Player added successfully."});
        }
    });
});


router.post('/player',(req, res)=>{
    let team = req.body.team;
    Player.getPlayersByTeamName(team,(err, players)=>{
        res.json({players: players});
    });
});

router.get('/all',(req, res)=>{
    Player.getPlayers((err, players)=>{
        res.json({players:players});
    });
});

module.exports = router;
