const express = require('express');
const router = express.Router();
const Topic = require('../models/topic');


router.post('/add/new',(req, res)=>{
	let newTopic = new Topic({
		name: req.body.name,
		id: req.body.id,
        anchor: req.body.anchor,
        ratings: req.body.ratings
    });

    Topic.addTopic(newTopic,(err, topic) =>{
        if(err){
            res.json({success: false, msg:"Failed To Add Topic."});
        } else{
            res.json({success: true, msg:"Topic Added Successfully."});
        }
    });
});


router.get('/topics',(req, res)=>{
    Topic.getTopics((err, topics)=>{
        res.json({topics: topics});
    });
});

module.exports = router;
