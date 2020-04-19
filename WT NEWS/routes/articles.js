const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.post('/add/new',(req, res)=>{
	let newArticle = new Article({
		articleId: req.body.articleId,
		name: req.body.name,
		description: req.body.description,
        date: req.body.date,
        topic: req.body.topic
    });

    Article.addArticle(newArticle,(err, article) =>{
        if(err){
            res.json({success: false, msg:"Failed To Add Article."});
        } else{
            res.json({success: true, msg:"Article Added Successfully."});
        }
    });
});


router.post('/article',(req, res)=>{
    let topic = req.body.topic;
    Article.getArticlesByTopicName(topic,(err, articles)=>{
        res.json({articles: articles});
    });
});

router.get('/all',(req, res)=>{
    Article.getArticles((err, articles)=>{
        res.json({articles:articles});
    });
});

module.exports = router;
