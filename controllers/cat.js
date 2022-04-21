const mongoose = require("mongoose"), Schema = mongoose.Schema; 

//GET '/cats'
const getAllCats = (req, res) => {
    Cat.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
        });
  // res.json({message: "GET all cats"});
};

//POST cat
const newCat = (req, res) => {
    console.log('NewCatttt => req ' + req.body);
  //check if the cat already exists in db
    // Cat.findOne({ name: req.body.name }, (err, data) => {
    // //if cat not in db, add it
    //     if (!data) {
        //create a new tea object using the Cta model and req.body
            const newCat = new Cat({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                will_scratch: req.body.will_scratch,
                created_at: req.body.created_at
            // locations: req.body.locations,
            });

        // save this object to database
            newCat.save((err, data) => {
            if (err) return res.json({ Error: data + " + " + err});
            return res.json(data);
            });
        //if there's an error or the tea is in db, return a message
        // } else {
            // if (err)
            // return res.json(`Something went wrong, please try again. ${err}`);
            // return res.json({ message: "Cat already exists" });
        // }
    // }
    // );
};

//GET '/cat/:name'
// const getCatByName = (req, res) => {
//     let _name = req.params.name; //get the cat name
//     // let id = req.params.name;

//     //find the specific tea with that name
//     Cat.findOne({name:_name}, (err, data) => {
//     if(err || !data) {
//         return res.json({message: "Cat name not found."});
//     }
//     else return res.json(data); //return the cat object if found
//     });
//     // res.json({ message: "GET 1 cat" });
// };

//GET '/cat/id'
const getCatById = (req, res) => {
    let _id = req.params.id; //get the cat name
    // let id = req.params.name;

    //find the specific tea with that name
    Cat.findOne({id:_id}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Cat id not found."});
    }
    else return res.json(data); //return the cat object if found
    });
    // res.json({ message: "GET 1 cat" });
};

//POST '/cat/:name'
const newCatPhoto = (req, res, next) => {
    res.json({ message: "POST 1 cat photo" });
};

//DELETE '/cat/:name'
const deleteCat = (req, res) => {
    let name = req.params.name; // get the id of review to delete

    Cat.deleteOne({name:name}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "cat doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({message: "cat deleted."});
    });
    // res.json({ message: "DELETE 1 cat" });
};

// //export controller functions
module.exports = {
    getAllCats,
    newCat,
    // deleteAllCats,
    // getCatByName,
    getCatById,
    newCatPhoto,
    deleteCat,
};

const Cat = require("../models/cat");
