const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const Article = require('../models/article');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

// ======================  Add New Question  ====================

router.post('/New_Question', (req, res, next) => {
    
    var tempCourse = req.body.data.Course;
    var tempQuestion = req.body.data.Question;
    var temp_Level = req.body.data.Question_Level;
    var tempChoices_ID = req.body.data.Choices_ID;
    var tempChoices_Text = req.body.data.Choices_text;
    var tempChoices_Check = req.body.data.Choices_checkbox;
    var temp_Level = req.body.data.Question_Level;
    var tempTopics = req.body.data.Topics;
    var tempSubTopics = req.body.data.SubTopics;

    let Question_data = {
                "Course" : tempCourse,"Question" : tempQuestion,"Level" : temp_Level,
                "Choice_ID" : tempChoices_ID, "Choice_Text" : tempChoices_Text, "Choice_Check" : tempChoices_Check,
                "Topics" : tempTopics, "SubTopics" : tempSubTopics};

    Question.addQuestion(Question_data, (err, question) => {
        if (err) {
            console.log(err);
            console.log("not Insert");
            res.json({ success: false, msg: 'Failed to Add New Question' });
        }
        else {
            console.log("Insert");
            res.json({ success: true, msg: 'Question Added' });
        }
    });
});

// --------------------  Get Question  -----------------------

router.post('/getAllQuestionsByData', (req, res, next) => {

    console.log("get questions buy router");
    
    data = { "course": req.body.course, "topic": req.body.topic };

    Question.get_Questions_By_Topic_Name(data, (err, list) => {
        if (err) throw err;
        if (!list) {
            return res.json({ success: false, msg: 'Questions not found' });
        }
        var return_obj = { 'success': true, 'data': list };
        return res.json(return_obj);
    });
});

module.exports = router;