const mongoose = require("mongoose")

    const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
},{timestamps:true});//what timestamp does is whenever a new entry is made using this schema it records the exact time it was created and will store in db

module.exports = mongoose.model("Category",categorySchema);