const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Course Schema

const CourseSchema = mongoose.Schema({
    _id: { type: Number, auto: true },
    Course_Name: {
        type: String,
        required: true
    },
    Topics: [{
        _id: { type: Number, auto: true },
        Topic_Name: {
            type: String,
            required: true
        },
        SubTopics: [{
            _id: { type: Number, auto: true },
            Sub_Topic_Name: {
                type: String,
                required: true
            },
            Link: {
                type: String,
                required: true
            }
        }]
    }]
}, { _id: false });

const Course = module.exports = mongoose.model('Course', CourseSchema);

//============================== Add New Course =========================

module.exports.addCourse = function (newCourse, callback) {
    newCourse.save(callback);
}

//============================= Add New Crawling Topics =======================

module.exports.add_Crawl_Topics = function (name, data, callback) {

    Course.find({ Course_Name: name }, function (err, data_result) {

        list = [temp_Topics];

        var db_topic_count = 0, topic_count = 0;

        // ------ course_exit, get total number of topics current ------

        db_topic_count = data_result[0].Topics.length;

        topic_count = db_topic_count;

        for (var i = 0; i < data.length; i++) {

            if (data[i].id < 100)       // ------ JAVATPOINT ------
            {
                var temp_Topics = {
                    _id: Number,
                    Topic_Name: String,
                    SubTopics: [temp_Sub_Topic]
                };

                for (var j = 0; j < data[i].list.length; j++) {
                    var temp_Sub_Topic = { _id: Number, Sub_Topic_Name: String, Link: String };

                    temp_Sub_Topic._id = j + 1;
                    temp_Sub_Topic.Sub_Topic_Name = data[i].list[j].sub.sub_heading.replace(/^"(.*)"$/, '$1');
                    temp_Sub_Topic.Sub_Topic_Name = temp_Sub_Topic.Sub_Topic_Name.replace(/^\n(.*)\n$/, '$1');
                    temp_Sub_Topic.Link = JSON.stringify(data[i].list[j].sub.link);

                    temp_Topics.SubTopics[j] = temp_Sub_Topic;
                }
                temp_Topics._id = ++db_topic_count;
                temp_Topics.Topic_Name = data[i].name;

                list[i] = temp_Topics;
                temp_Topics = null;
            }
            else                       // ----- TUTORIAL POINT ------
            {
                var temp_Topics = {
                    _id: Number,
                    Topic_Name: String,
                    SubTopics: [temp_Sub_Topic]
                };

                for (var j = 0; j < data[i].list.link.length; j++) {

                    var temp_Sub_Topic = { _id: Number, Sub_Topic_Name: String, Link: String };

                    temp_Sub_Topic._id = j + 1;
                    temp_Sub_Topic.Sub_Topic_Name = data[i].list.sub_heading[j].replace(/^"(.*)"$/, '$1');
                    temp_Sub_Topic.Sub_Topic_Name = temp_Sub_Topic.Sub_Topic_Name.replace(/^\n(.*)\n$/, '$1');
                    temp_Sub_Topic.Link = data[i].list.link[j];

                    temp_Topics.SubTopics[j] = temp_Sub_Topic;
                }
                temp_Topics._id = ++db_topic_count;
                temp_Topics.Topic_Name = data[i].name.replace(/^"(.*)"$/, '$1');
                temp_Topics.Topic_Name = temp_Topics.Topic_Name.replace(/^\n(.*)\n$/, '$1');
                list[i] = temp_Topics;
            }
        }

        // ------------ Check For Duplication Topics -----------

        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < data_result[0].Topics.length; j++) {
                if (data_result[0].Topics[j].Topic_Name == list[i].Topic_Name) {
                    list[i] = null;
                    j = data_result[0].Topics.length;
                }
            }
        }

        // -------- Get total number of topics in specific course -------

        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                Course.findOneAndUpdate({ Course_Name: name }, { $push: { Topics: list[i] } }, function (err, ress) {
                    if (err)
                        console.log(err);
                    else
                        console.log("topics are added");
                });
            }
            else {
                console.log("Already Exist");
            }
        }
    });
}


//--- Add New Topics ----

module.exports.addTopics = function (data, callback) {
    //newCourse.save(callback);

    var node = [{ Topic_Name: String, SubTopics: [{ Sub_Topic_Name: String }] }];

    list_of_sub_headings = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i].length == 4) {
            var names = data[i][0];
            var sub_headings = data[i][1].sub.sub_heading;
        }
        if (data[i].length == 3) {

        }
    }
    //Course.update({_id:1},{$set : {"Topics.$.Topic_Name": data,"Topics.$.SubTopics.$.Sub_Topic_Name":data}})
}

//--- Get All Course ----

module.exports.getAllCourse = function (callback) {
    Course.find({}, ['Course_Name', 'Topics'], callback);
}

//---------------------------- OLD CODE ---------------------

/*
//Course Schema

const CourseSchema = mongoose.Schema({
    Course_Name: {
        type: String,
        required: true
    },
    Topics: [String]
});

const Course = module.exports = mongoose.model('Course', CourseSchema);

//--- Add New Course ----

module.exports.addCourse = function(newCourse,callback){
    newCourse.save(callback);
}

//--- Get All Course ----

module.exports.getAllCourse = function (callback) {
    
    Course.find({},['Course_Name','Topics'],callback);

    // Course.find({}).lean().exec().then((list)=>{
    //         //console.log(list.Course_Name)
    //         res.json(list)
    //     }).catch((err)=>
    //     {
    //         //res.send("error")
    //     });
}

// module.exports.getUserById = function (id, callback) {
//     User.findById(id, callback); 
// }

// module.exports.getCourseByName = function (name, callback) {
//     //const query = { "Course_Name": name };
//     Course.find({}, callback);
//     //Course.getCourseByName(query,callback);
// }

// module.exports.getCourseByName = function (name, callback) {
//     Course.find().lean().exec(function(err,docs){
    
//         // If there is an error, return the error and no results
//         if(err) 
//         return callback(err, null)

//         // No error, return the docs
//         callback(null, docs)
//     });
// }

// CourseSchema.statics.getCourseByName = function (name, callback) {
//     Course.find().lean().exec(function(err,docs){
    
//         // If there is an error, return the error and no results
//         if(err) 
//         return callback(err, null)

//         // No error, return the docs
//         callback(null, docs)
//     });
// }

// CourseSchema.statics.getCourseByName = function (callback) {
//     return this.find().lean().exec(callback);
//   }
// module.exports.getAllTasks = function(callback){ // we will pass a function :)
//     Task.find().lean().exec(function (err, docs) {
//     console.log(docs); // returns json
//     callback(docs); // <-- call the function passed as parameter
// });
// }

module.exports.getCourseByName = function(callback){
    // // we will pass a function
    // Course.find({}).exec(function(err,docs){
    //     console.log('call from models');
    //     console.log(docs);   // returns json
    //     callback(docs);   // <-- call the function passed as parameter
    // });

    // Person.find((err, people) => {  
    //     if (err) {
    //         // Note that this error doesn't mean nothing was found,
    //         // it means the database had an error while searching, hence the 500 status
    //         res.status(500).send(err)
    //     } else {
    //         // send the list of all people
    //         res.status(200).send(people);
    //     }
    // });

    Course.find((err,result)=>{
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            //res.status(500).send(err)
        } else {
            console.log("Result : " + result);
            // send the list of all people
            //res.status(200).send(result);
        }
    });
}

*/