// CONFIGURING EXPRESS

const express = require('express');
const { model } = require('mongoose');
const app = express();
const port = process.env.PORT || 3000

const path = require('path');

// for post req body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// db
require('./dbs/conn')
const Register = require('./dbs/Schema');

// web files
app.use(express.static(path.join(__dirname,'./build')))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'./registerPage.html'))
})

// create new user in db
app.post('/register', async(req, res) => {
    try{
        const newRegister = new Register({
            firstname: req.body.firstName,
            lastname: req.body.secondName,
            email: req.body.email,
            gender: req.body.Gender,
            phone: req.body.phoneNo,
            password: req.body.password
        })

        const result = await newRegister.save();
        console.log(result);

        res.status(200).send('done')
    }catch(err){
        res.status(404).send("Some Error occured");
    }
})

app.listen(3000, () => {
    console.log("server connected");
})