const mongoose = require('mongoose');
require('dotenv').config()

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//My routes 
const authRoutes = require("./routes/auth")   //authRoutes contains the destination where routes are defined in auth.js in routes folder
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")

/*NOTE: first parameter mongoose takes is the url string to connect to database where tshirt is name of Database.
 All variables are attached in process. We define the env variables in .env file. Also the .env file does not get uploaded to github */

// DB connection
mongoose.connect(process.env.DATABASE,
{ useNewUrlParser: true,    //this property is compulsory
  useUnifiedTopology: true, //this helps in keeping db connection alive
  useCreateIndex: true //there are couple of other properties check doc
}).then(() => {
    console.log("DB CONNECTED");  //myfun.run().then().catch()  in this then() runs if run() is satisfied or else caatch() is executed
});


//MIDDLEWARES INCLUDED USING app.use
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTES
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);

//PORT
const port = process.env.PORT || 8000; //const port = 8000;

//STARTING A SERVER
app.listen(port, () =>{
    console.log(' app is running at ${}port ');
});

/* One the most important things are environment variables so that when someone else is running the same
project they can see the private keys the payment gateways and other stuff. Also when we deploy an application in real world we hide the 
port nos. for protection using env variables included in: npm dotenv */