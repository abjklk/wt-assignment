const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    articleId:{
        type: Number
    },
    name:{
        type: String
    },
    description:{
        type: String
    },
    date:{
        type: Date
    },
    topic:{
        type: String
    },
});

const Article = module.exports = mongoose.model('Article',ArticleSchema);

module.exports.addArticle = function(newArticle, callback){
    newArticle.save(callback);
}

module.exports.getArticlesByTopicName = function(topic,callback){
    Article.find({topic:topic},callback);
}

module.exports.getArticles = function(callback) {
    Article.find({},callback);
}