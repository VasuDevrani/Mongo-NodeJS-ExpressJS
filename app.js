// *** try catch or .then,.catch can be used anywhere, each method returns promise***
// *** look for docs for methods and operators***

const mongoose = require("mongoose");

// connect appliication to mongodb database
mongoose
  .connect("mongodb://localhost:27017/cricketers")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

// Schema - defines the structure/datatype ( schematype )/field-structure of documents i.e. default values, validators, etc....
// schema maps to the database collections

// creating the schema/ data format for collection
const PlayerSchema = new mongoose.Schema({
  // name: String,
  name: {
    type: String,
    required: true,
  },
  post: String,
  age: Number,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose model is a wrapper over Mongoose schema that provides interface to CRUD operations using expressJS

// creating model object, constructor takes two arguments model name and schema registered above
// collection creation (gets converted to plural)
const Player = new mongoose.model("Player", PlayerSchema);
// Now we can create collections with documents

// ______________________________________________________
//CREATE document (C)

const createDocument = async () => {
  try {
    const playerOne = new Player({
      name: "Sachin Tendulkar",
      post: "Batsman",
      age: 50,
      active: true,
    });

    const result = await playerOne.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

// now run the program to add document and create a new db (don't use nodemon)

// inserting multiple documents
const createDocumentMany = async () => {
  try {
    const playerTwo = new Player({
      name: "Rohit Sharma",
      post: "Batsman",
      age: 37,
      active: true,
    });

    const playerThr = new Player({
      name: "Sunil Gavaskar",
      post: "Batsman",
      age: 67,
      active: true,
    });

    const playerFr = new Player({
      name: "Jasprit Bumrah",
      post: "Pacer",
      age: 27,
      active: true,
    });

    const playerFive = new Player({
      name: "Mohd. Shami",
      post: "Bowler",
      age: 32,
      active: true,
    });

    const result = await Player.insertMany([
      playerTwo,
      playerThr,
      playerFr,
      playerFive,
    ]);

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

//   createDocumentMany();

// _______________________________________________________

// READ operation (R)
// read in form of array
const getDocument = async () => {
  const result = await Player.find().select({ name: 1, _id: 0 });
  // const result = await PLayer.find({age: 30}) filter result
  // just show name use-  .select({name: 1})
  //   .limit(1)

//   query comparisons
  const resultQuery = await Player.find({age: {$gt: 49}}).select({age: 1, name:1, _id: 0});

//   logical operators
    const resultLogic = await Player.find({$or: [{age: 27}, {name: "Sunil Gavaskar"}]}).select({age: 1, name:1, _id: 0});

//  COUNT, can be used with find or other methods as well
    const count = await Player.countDocuments();

//  SORTING => .sort({name: 1}), here 1 represent ascending and -1 descending

  console.log(resultQuery);
  console.log(resultLogic);
  console.log(result);
  console.log(count);
};

// getDocument();

// _____________________________________________________

// UPDATE operation (U)
// update needs the id of document to be updated, in actual application we can use read method and destructuring to access id of a particular document as per req

// uses update operators in mongodb and metods like updateOne, updateMany

const updateDocument = async (_id) => {
    try{
        const result = await Player.updateOne({_id},{
            $set: {
                name: "ravinder Jadeja"
            }
        } );
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// updateDocument("62bb335b92b863243d397e95");


// _______________________________________________________

// DELETE operation (D)
const deleteDocument = async (_id) => {
    const result = await Player.deleteOne({_id});

    console.log(result);
}

// deleteDocument("62bb335b92b863243d397e97");
