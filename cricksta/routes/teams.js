const express = require('express');
const router = express.Router();
const Team = require('../models/team');


router.post('/add/new',(req, res)=>{
	let newTeam = new Team({
		name: req.body.name,
		rank: req.body.rank,
        color: req.body.color,
        captain: req.body.captain,
        worldCups: req.body.worldCups
    });

    Team.addTeam(newTeam,(err, team) =>{
        if(err){
            res.json({success: false, msg:"Failed to add Team"});
        } else{
            res.json({success: true, msg:"Team added successfully."});
        }
    });
});


router.get('/teams',(req, res)=>{
    Team.getTeams((err, teams)=>{
        res.json({teams: teams});
    });
});

module.exports = router;
