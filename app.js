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
  console.log(result);
};

getDocument();
