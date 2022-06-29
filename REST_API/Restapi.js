// REST - Representational State Transfer
// Restful API - a style to access data using http requests

const express = require('express');
const app = express();
// accessing db
require('./connection');
const Student = require('./Schema')

// assign port number at different systems
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Home page")
});

// ________________________________________________________
// CREATE (C), creating student

// middleware function to access the body of req
app.use( express.urlencoded({extended: false}));
app.use(express.json());

app.post('/students/post', (req, res) => {
    console.log(req.body);

    // after sending the post req with body from by JS or postman, can use try catch with async await as well 
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(200).send(user);
    })
    .catch((err) => {
        res.status(404).send(err);
    });

// adding this line is a error
    // res.send("Post req made");
})

// try catch async await block of code for post req
// try{
//     const user = new Student(req.body);
//     const createUser = await user.save();
//     res.status(200).send(createUser);
// }catch(err){
//     res.status(400);
// }



// READ operation ____________________________________________

// all data
app.get('/students/get', async(req,res) => {
    try{
        const data = await Student.find();
        res.status(200).send(data);
    }catch(err){
        res.status(404).send();
    }
})

// individual data
app.get('/students/get/:id', async(req,res) => {
    try{
        const _id = req.params.id;
        console.log(_id);

        const result = await Student.find({_id});

        res.status(200).send(result);
    }catch(err){

    }
})


// DELETE operation _______________________________________

app.delete('/students/delete/:id', async(req,res) => {
    try{
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);

        if(!req.params.id){
            return res.status(400).send();
        }
        res.status(200).send(deleteStudent)
    }catch(err){
        res.status(404).send("not found in the db");
    }
})


// PUT-PATCH operation______________________________________

app.patch('/students/delete/:id', async(req,res) => {
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body);

        res.status(200).send(updateStudent);

    }catch(err){
        res.status(404).send("not found in the db");
    }
})


app.listen(port, () => {
    console.log("server connected");
})