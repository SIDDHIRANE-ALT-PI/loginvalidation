const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');
const { response } = require('express');

app.use(bodyParser.json());

//parse application/json
app.use(bodyParser.json());

//Database Connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',                         /* MySQL User */
    password: 'rootpassword',              /* MySQL Password */
    database: 'userinformation'           /* MySQL Database */
});

//Shows Mysql Connect to the database
con.connect((err) => {
    if (!err)
        console.log('NODE Connected to the database successfully');
    else
        console.log('Connection Failed \n Error:' + JSON.stringify(err, undefined, 2));
})

app.post('/saveData', [

    check('applicantname', 'applicantname length should be 10 to 20 characters and applicantname should not be empty')
        .isLength({ min: 10, max: 20 }),

    // check('applicantname','applicantname Must be only alphabetical chars').isAlpha(),


    check('username', 'username length should be 10 to 20 characters and name should not be empty')
        .isLength({ min: 10, max: 20 }),

    //check('username','username Must be only alphabetical chars').isAlpha(),


    check('email', 'Email length should be 10 to 30 characters and email should not be blank')
        .isEmail().isLength({ min: 10, max: 30 }),

    //check('email','email should be alphanumeric with special character @').isAlphanumeric(),


    check('password', 'password length should be 8 to 10 characters and password should not be blank')
        .isLength({ min: 8, max: 10 }),

    //check('password','password should be alphanumeric').isAlphanumeric(),


    check('mobile', 'Mobile number should contains 10 digits and mobile must be valid')
        .isLength({ min: 10, max: 10 }),

    check('usertype', 'usertype length should be 5 to 15 characters')
        .isLength({ min: 5, max: 10 }),

], (req, res) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }

    else {
        res.send("Successfully validated")
    }
});

//set login port
app.listen(2022, () => console.log('Express server is running at port no:2022'));
