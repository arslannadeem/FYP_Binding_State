const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error' + err);
});

// On async call

mongoose.Promise = global.Promise;

const app = express();

const users = require('./routes/users');
const course = require('./routes/course');
const quiz = require('./routes/question');
const article = require('./routes/article');
const crawl = require('./routes/scrapping');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware 
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/course', course);
app.use('/question', quiz);
app.use('/article', article);
app.use('/modify-topic', crawl);
app.use('/modify-question', crawl);

// Index Route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});

// Start Server
try{
app.listen(port, () => {
    console.log("Server started on port " + port);
});
}
catch(ex)
{

}