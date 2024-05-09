const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    branchName : {
        type : String,
        required : true
    },
    country :{
        type : String,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    }
});

const Branch = mongoose.model("Branches", branchSchema);

module.exports = Branch;