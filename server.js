// Require all necessary files
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');


const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));