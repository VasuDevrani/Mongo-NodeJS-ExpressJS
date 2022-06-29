// Mongoose provides inbuilt validation method to keep a check on the data inserted
// On the docs check under the schema types

// added to schema 

const PlayerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 40,
      trim: true
    },
    post: String,
    age: {
        type: Number,
        max: 100,
        enum: [20,30,40,80,90,99]
    },
    active: Boolean,
    date: {
      type: Date,
      default: Date.now,
    },
  });

// custom validation, put in schema
  Validite(value){
    type:Number,
    validate(value){
        if(value<0){
            throw new Error("coutn is not acceptable");
        }
    }
  }

// validation package
// => validator package
// put in schema***
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

email: {
    type: String,
    required: true,
    validate(value){
       if(!isEmail(value)){
            throw new Error("wrong email")
        }
    }
}

