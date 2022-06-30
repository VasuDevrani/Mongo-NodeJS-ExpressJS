const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RegisterPage', async() => {
    try{
        console.log("database connected to app")
    }catch(err){
        console.log("can't connect to db");
    }
})

module.exports = mongoose;