const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Question Schema

const QuestionsSchema = mongoose.Schema({
    _id: { type: Number, auto: true },
    Description: { type: String, required: true },
    Level: [{ type: String, required: true }],
    Topic_Name: { type: String, required: true },
    Sub_Topic_Name: [{ type: String, required: true }],
    Choices: [{
        _id: { type: Number }, Status: { type: Boolean, required: true },
        Description: { type: String, required: true }
    }]
}, { _id: false });

const Question = module.exports = mongoose.model('Question', QuestionsSchema);

//--- Add New Question ----

module.exports.addQuestion = function (newQuestion, callback) {

    var temp_array = [];

    for (var i = 0; i < newQuestion.Choice_ID.length; i++) {
        var temp_Choices = {
            _id: Number,
            Status: false,
            Description: String,
        };

        temp_Choices._id = i + 1;
        temp_Choices.Description = newQuestion.Choice_Text[i];

        temp_array.push(temp_Choices);
    }

    if (newQuestion.Choice_Check) {
        for (var i = 0; i < newQuestion.Choice_Check.length; i++) {
            temp_array[newQuestion.Choice_Check[i] - 1].Status = true;
        }
    }

    var temp_level = [];

    for (var i = 0; i < newQuestion.Level.length; i++) {
        temp_level[i] = newQuestion.Level[i].itemName;
    }

    var temp_sub_topic = [];

    for (var i = 0; i < newQuestion.SubTopics.length; i++) {
        temp_sub_topic[i] = newQuestion.SubTopics[i].itemName.replace(/^"(.*)"$/, '$1');;
    }
    var id;
    Question.count({}, function (err, count) {
        console.log(count);
        if (!count > 0) {
            id = 1;
        }
        else {
            id = ++count;
        }

        let obj = new Question({
            _id: id,
            Description: newQuestion.Question,
            Level: temp_level,
            Topic_Name: newQuestion.Topics[0].itemName,
            Sub_Topic_Name: temp_sub_topic,
            Choices: temp_array
        });

        obj.save(callback);
    })
}

module.exports.get_Questions_By_Topic_Name = function (data, callback) {
    console.log("question model")
    console.log(data);
    Question.find({ 'Topic_Name': "\n" + data.topic + "\n" }, callback);
}