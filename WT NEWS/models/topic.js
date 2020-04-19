const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
    name:{
        type: String
    },
    id:{
        type: Number
    },
    anchor:{
        type:String
    },
    ratings:{
        type: Number
    }
});

const Topic = module.exports = mongoose.model('Topic',TopicSchema);

module.exports.addTopic = function(newTopic, callback){
    newTopic.save(callback);
}

module.exports.getTopics = function(callback){
    Topic.find({},callback);
}
