const express = require('express');
const router = express.Router();
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

var request = require('request'),
    cheerio = require('cheerio');

// ------------ Scrapping the Topics with Sub-Topics ----------------

router.get('/Show_Topics_Left', (req, res, next) => {

    var check2;
    var items = [];
    var combine_data = [];
    var items2 = [];

    //========================  TOPICS OF JAVATPOINT =================

    request('https://www.javatpoint.com/cpp-tutorial', function (err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var i = 0;
            var $ = cheerio.load(body);

            //-------------------- TOPICS -------------------

            $("#menu").each(function () {
                var complete = $(this).children();
                var i = 0;
                complete.each(function () {
                    var topic_name = $(this).attr("class");
                    if (topic_name == "leftmenu2") {
                        //"-------------- HEADINGS ------------";
                        check2 = $(this).text();
                    }
                    else if (topic_name == "leftmenu") {
                        //"-------------- SUB HEADING------------";
                        var subheadings = $(this).children();
                        subheadings.each(function () {
                            if ($(this).attr("href") != null) {
                                var url = "https://www.javatpoint.com/" + $(this).attr("href");
                                items.push(url, $(this).text(), check2);
                            }
                        });
                        combine_data.push(check2, items);
                        check2 = null;
                    }
                    items = [];
                });
            });
        }
        if (!combine_data) {
            return res.json({ success: false, msg: ' Topics not found' });
        }
        var return_obj = { 'success': true, 'data': combine_data };
        return res.json(return_obj);
    });
});

//========================  TOPICS OF TUTORIAL POINT =================

router.get('/Show_Topics_Right', (req, res, next) => {

    var items2 = [];

    request('https://www.tutorialspoint.com/cplusplus/cpp_arrays.htm', function (err, resp, html) {

        if (!err && resp.statusCode == 200) {

            var complete = html.toString();
            var i = 0;
            var $ = cheerio.load(html);

            var Headlines = [];
            var stringuse = "";

            $(".sidebar").each(function () {
                var complete = $(this).children().addClass("checks");
                complete.each(function () {

                    if ($(this).get(0).tagName == "ul") {
                        var heading = "";
                        if ($(this).attr('class') == "nav nav-list primary left-menu checks") {

                            var nextchild = $(this).children();
                            if (nextchild.attr('class') == "heading") {
                                heading = $(this).text();

                                var value = "";
                                for (i = 1; i < heading.length; i++) {
                                    value = value + heading[i];
                                    if (heading[i] == '\n') {
                                        i = heading.length;
                                    }
                                }
                                var subtopics = [];
                                var Headlines = heading.split('\n');
                                for (i = 2; i < Headlines.length; i++) {
                                    if (!Headlines[i].includes('Home') && !Headlines[i] == '') {
                                        subtopics.push(Headlines[i]);
                                    }
                                } heading = value;
                            }

                            var child = $(this).children().children();
                            var urlss = [];
                            child.each(function () {
                                var data = ($(this).attr("href"));

                                if (!data.includes('index')) {
                                    urlss.push("https://www.tutorialspoint.com" + data);
                                }
                            })
                            items2.push(subtopics, urlss, heading);
                        }
                    }
                })
            });
        }
        if (!items2) {
            return res.json({ success: false, msg: ' Topics not found' });
        }
        var return_obj = { 'success': true, 'data': items2 };
        return res.json(return_obj);
    });
});

//========================  ARTICLES OF TUTORIAL POINT =================

router.post('/Articles_tutorial_point', (req, res, next) => {
    var data = [];

    request(req.body.web.link_data.link, function (err, resp, html) {

        if (!err && resp.statusCode == 200) {
            var $ = cheerio.load(html);
            var Headlines = [];
            var parah = [];

            $(".col-md-7").each(function () {

                var complete = $(this).children().addClass("checks");
                var Paragraph = "";

                (complete).each(function () {

                    if ($(this).get(0).tagName !== "h2" && $(this).get(0).tagName !== "h1") {

                        if ($(this).get(0).tagName == "p") {
                            Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">"
                        }
                        else if ($(this).get(0).tagName == "pre") {
                            Paragraph = Paragraph + "<pre class = 'result notranslate'>" + $(this).text() + "</pre>";
                        }
                        else if ($(this).get(0).tagName == "img") {
                            Paragraph = Paragraph + "<img src = " + "https://www.tutorialspoint.com" + $(this).get(0).attribs.src + " " + "alt = " + $(this).get(0).attribs.alt + ">";
                        }
                        else if ($(this).get(0).tagName == "h3") {
                            Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">";
                        }
                        else if ($(this).get(0).tagName == "ul") {
                            // ---- ul 
                            Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">";
                            var end = $(this).get(0).tagName;
                            $(this).children(function () {
                                if ($(this).get(0).tagName == "li") {
                                    // --- all li in above ul ----
                                    Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">";
                                }
                            });
                            Paragraph = Paragraph + "</" + end + ">";
                        }
                    }
                    else {
                        Headlines.push("<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">");
                        if (Paragraph.length > 1) {
                            parah.push(Paragraph);
                        }
                        Paragraph = "";
                    }
                })
            });

            for (j = 0; j < parah.length; j++) {
                data[j] = {"Head" : Headlines[j], "Para" : parah[j],"Sub_Topic" : req.body.web.link_data.SubTopic};
            }

            if (!data) {
                return res.json({ success: false, msg: ' Articles not found' });
            }
            var return_obj = { 'success': true, 'data': data };
            return res.json(return_obj);
        }
    });
});

//=========================  ARTICLES OF JAVATPOINT =================

router.post('/Articles_javat_point', (req, res, next) => {

    var data = [];

    request(req.body.web.link_data.link, function (err, resp, html) {

        if (!err && resp.statusCode == 200) {
            var $ = cheerio.load(html);
            var Headlines = [];
            var parah = [];

            $("#city").each(function () {
                var complete = $(this).children().children().children().children().children().addClass("checks");
                var Paragraph = "";
                (complete).each(function () {

                    if ($(this).get(0).tagName !== "h2" && $(this).get(0).tagName !== "h1") {

                        if ($(this).get(0).tagName == "p") {
                            Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">"
                        }
                        else if ($(this).get(0).tagName == "textarea") {
                            Paragraph = Paragraph + "<pre class = 'result notranslate'>" + $(this).text() + "</pre>";
                        }
                        else if ($(this).get(0).tagName == "pre") {
                            Paragraph = Paragraph + "<pre class = 'result notranslate'>" + $(this).text() + "</pre>";
                        }
                        else if ($(this).attr('class') == "codeblock checks") {
                            Paragraph = Paragraph + "<pre class = 'result notranslate'>" + $(this).text() + "</pre>";
                        }
                        else if ($(this).get(0).tagName == "img") {
                            Paragraph = Paragraph + "<img src = " + "https://www.javatpoint.com/" + $(this).attr("src") + " " + "alt = " + $(this).attr("alt") + ">";
                        }
                        else if ($(this).get(0).tagName == "h3") {
                            Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">";
                        }
                        else if ($(this).get(0).tagName == "ul") {
                            // ---- ul 
                            Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">";
                            var end = $(this).get(0).tagName;
                            $(this).children(function () {
                                if ($(this).get(0).tagName == "li") {
                                    // --- all li in above ul ----
                                    Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">";
                                }
                            });
                            Paragraph = Paragraph + "</" + end + ">";
                        }
                    }
                    else {
                        Headlines.push("<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">");
                        if (Paragraph.length > 1) {
                            parah.push(Paragraph);
                        }
                        Paragraph = "";
                    }
                });
            });
            for (j = 0; j < parah.length; j++) {
                data[j]={"Head" : Headlines[j], "Para" : parah[j], "Sub_Topic" : req.body.web.link_data.SubTopic};
            }

            if (!data) {
                return res.json({ success: false, msg: ' Articles not found' });
            }
            var return_obj = { 'success': true, 'data': data };
            return res.json(return_obj);
        }
    });
});

module.exports = router;