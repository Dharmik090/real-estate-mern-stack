const mongoose = require('mongoose');
// const url = "mongodb+srv://<email>:<password>@cluster0.v5pxg.mongodb.net/real_estate?retryWrites=true&w=majority&appName=Cluster0";

// for localhost : 
const url = "mongodb://localhost:27017/real_estate";

mongoose.connect(url)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch(() => {
    console.log("Database Connection Failed");
  });
