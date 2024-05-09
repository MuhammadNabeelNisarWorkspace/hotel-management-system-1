const mongoose = require("mongoose");


const connection = async ()=>{
  try {
    await mongoose.connect(
      "mongodb+srv://muhammadnabeelnisarworkspace:ZjSNAZ5gzRkr6MIu@cluster0.od38brp.mongodb.net/hotel-management-system"
    );
  } catch (error) {
    console.log("Error Connecting  Database", error);
    process.exit(0);
  }
}

module.exports = connection;