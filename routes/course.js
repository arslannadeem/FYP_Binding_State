const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

// --------------------  Add New Course  -----------------------

router.post('/newCourse',(req,res,next)=>{
    console.log("router")

    let newCourse = new Course({
        _id : 2,
        Course_Name : 'DataStructure',
        Topics : [{_id : 1, Topic_Name : 'LinkList', SubTopics : [{_id : 1, Sub_Topic_Name : 'Single LinkList'},{_id : 2, Sub_Topic_Name : 'Double LinkList'}]},
        {_id : 2, Topic_Name : 'Graph', SubTopics : [{_id : 1, Sub_Topic_Name : 'Adjecent List'},{_id : 2, Sub_Topic_Name : 'Adjecent Matrix'}]}]
    });

    Course.addCourse(newCourse,(err,course)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Add New Course'});
        }
        else
        {
            res.json({success : true,msg : 'Course Registered'});
        }
    });
});

router.post('/newTopics',(req,res,next)=>{
    
    data = {"name" : req.body.name,"list" : req.body.list};
    
    // let newCourse = new Course({
    //     _id : 1,
    //     Course_Name : 'OOP',
    //     Topics : { _id : 1,Topic_Name : 'Pointer', SubTopics : { _id : 1,Sub_Topic_Name : 'Null Pointer'}}
    // });

    // let newCourse = new Course({})
    
    Course.addTopics(data,(err,course)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Add New Course'});
        }
        else
        {
            res.json({success : true,msg : 'Course Registered'});
        }
    });
});

// ======================  GET All Topics By Course  =====================

router.post('/getTopicsByCourse',(req,res,next)=>{
    
    data = req.body.course;
    
    Course.find({'Course_Name' : data},(err,topics)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Get All Topics'});
        }
        else
        {
            res.json({success : true,msg : 'Topics Read Successfully',data : topics});
        }
    });
});

// =========================== Save Crawl Topics ==========================

router.post('/add_Crawl_Topics',(req,res,next)=>{
    
    Course.add_Crawl_Topics(req.body.course_name, req.body.List,(err,course)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Add New Course'});
        }
        else
        {
            res.json({success : true,msg : 'Course Registered'});
        }
    });
});

// ==========================  GET All Course  =========================


router.get('/getAllCourses', passport.authenticate('jwt', { session: false }),function(req, res)
{   

    

    try{
    console.log("in course route");
    Course.getAllCourse((err,list)=>{
        if(err) throw err;
        if(!list){
            return res.json({success:false,msg : 'Courses not found'});
        }
        console.log("After get course list");
        console.log(list);
        var return_obj = { 'success' : true , 'data' : list};
        return res.json(return_obj);
    });
}
catch(error){
    var return_obj = { 'success' : true};
    res.json(return_obj);
}
});

/*
// --------------------  Add New Course  -----------------------

router.post('/newCourse',(req,res,next)=>{
    let newCourse = new Course({
        Course_Name : 'DataBase',
        Topics : ["Normalization","SQL","NoSQL"]
    });

    Course.addCourse(newCourse,(err,course)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Add New Course'});
        }
        else
        {
            res.json({success : true,msg : 'Course Registered'});
        }
    });
});
*/

module.exports=router;