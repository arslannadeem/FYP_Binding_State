const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

// --------------------  Add New Articles  -----------------------

router.post('/New_Article', (req, res, next) => {

    var temp_Level = req.body.data.Level;
    var tempTopics = req.body.data.Topics;
    var tempSubTopics = req.body.data.SubTopics;
    var tempHeading = req.body.data.Heading;
    var tempHead = req.body.data.Head;
    var tempPara = req.body.data.Para;
    var temp_Sub_Heading = req.body.data.Sub_Topic_Heading;

    let Article_data = {
        "Topics": tempTopics, "Level": temp_Level, "Heading": tempHeading,
        "Head": tempHead, "Para": tempPara, "Sub_Topic_Heading": temp_Sub_Heading
    };

    Article.addArticle(Article_data, (err, article) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Add New Article' });
        }
        else {
            res.json({ success: true, msg: 'Article Added' });
        }
    });
});

router.post('/getArticleByWrongQuestion', (req, res, next) => {
    console.log("routes");
    Article.ArticleResult(req.body.data, (err, article) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'Failed to Search Article' });
        }
        else {
            res.json({ success: true, msg: 'Articles Get Sucessfully', "articles": article });
        }
    });
});

module.exports = router;