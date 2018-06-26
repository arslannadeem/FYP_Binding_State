const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Article Schema

const ArticlesSchema = mongoose.Schema({
    _id: { type: Number, auto: true },
    Article_Heading: { type: String, required: true },
    Description: { type: String, required: true },
    Article_Level: [{ type: String, required: true }],
    Topic_Name: { type: String, required: true },
    Sub_Topic_Name: { type: String, required: true }
}, { _id: false });

const Article = module.exports = mongoose.model('Article', ArticlesSchema);

//--- Add New Article ----

module.exports.addArticle = function (newArticle, callback) {

    var temp_level = [];

    for (var i = 0; i < newArticle.Level.length; i++) {
        temp_level[i] = newArticle.Level[i].itemName;
    }

    var temp_sub_heading = [];

    for (var i = 0; i < newArticle.Heading.length; i++) {
        temp_sub_heading[i] = newArticle.Heading[i].itemName;
    }

    var temp_sub_heading_id = [];

    for (var i = 0; i < newArticle.Heading.length; i++) {
        temp_sub_heading_id[i] = newArticle.Heading[i].id;
    }

    var size = newArticle.Heading.length;
    var id;

    Article.count({}, function (err, count) {
        if (!count > 0) {
            id = 1;
        }
        else {
            id = ++count;
        }

        var list_of_article = [];

        for (var j = 0; j < temp_sub_heading.length; j++) {

            let obj_article = new Article({
                _id: id + j,
                Article_Heading: temp_sub_heading[j],
                Description: newArticle.Head[temp_sub_heading_id[j]] + newArticle.Para[temp_sub_heading_id[j]],
                Article_Level: temp_level,
                Topic_Name: newArticle.Topics[0].itemName.replace(/^"(.*)"$/, '$1'),
                Sub_Topic_Name: newArticle.Sub_Topic_Heading[temp_sub_heading_id[j]].replace(/^"(.*)"$/, '$1')
            });
            list_of_article[j] = obj_article;
        }

        // ------ if already exist then not add -----------

        final_list_of_unique_articles = [];

        found = false;

        Article.find({}).exec(function (err, all_list) {
            for (var i = 0, k = 0; i < list_of_article.length; i++) {
                for (var j = 0; j < all_list.length; j++) {
                    if (list_of_article[i].Topic_Name == all_list[j].Topic_Name &&
                        list_of_article[i].Sub_Topic_Name == all_list[j].Sub_Topic_Name) {
                        found = true;
                        j = all_list.length;
                    }
                }
                if (!found) {   // -- if article is not exit
                    final_list_of_unique_articles[k] = list_of_article[i];
                    console.log("article is not exit");
                }
                else {          // -- if article is exit 
                    found = false;
                    console.log("article is exit");
                }
            }

            console.log("=-----------------Articels--------------------------=")
            console.log(final_list_of_unique_articles);
            console.log("=-----------------Articels--------------------------=")
            
                    //--------  Add list of articles ---------
            Article.insertMany(final_list_of_unique_articles, callback);
        });
    });
}

// -------------- Getting Articles with respect to wrong question --------------

module.exports.ArticleResult = function (questionList, callback) {

    temp_topics = [];
    temp_sub_topics = [];
    temp_level = [];

    for (var i = 0; i < questionList.length; i++) {
        temp_level[i] = questionList[i].Level;
        temp_topics[i] = questionList[i].Topic_Name;
        temp_sub_topics[i] = questionList[i].Sub_Topic_Name;
    }

    var temp_articles = [];
    var errr;

    Article.find({}).exec(function (err, results) {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            found_article = false;

            for (var i = 0; i < questionList.length; i++) {
                for (var j = 0; j < temp_sub_topics[i].length; j++) {
                    for (var k = 0; k < results.length; k++) {
                        if (temp_sub_topics[i][j] == results[k].Sub_Topic_Name.replace(/^"(.*)"$/, '$1')
                            && temp_topics[i].replace(/^"(.*)"$/, '$1') == results[k].Topic_Name.replace(/^"(.*)"$/, '$1')) {
                            
                            // check sub topic and topic names
                            
                            results[k].Topic_Name = results[k].Topic_Name.replace(/^"(.*)"$/, '$1');
                            results[k].Sub_Topic_Name = results[k].Sub_Topic_Name.replace(/^"(.*)"$/, '$1');
                            
                            for (var l = 0; l < temp_level[i].length; l++) {
                                if (temp_level[i][l] == results[k].Article_Level[l]) {
                                    found_article = true;
                                    l = temp_level[i].length;
                                }
                            }
                            if (found_article) {
                                console.log("found");
                                temp_articles.push(results[k]);
                                found_article = false;
                            }
                        }
                    }
                }
            }
            callback(null, temp_articles);
        }
    });
}