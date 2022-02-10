const mongoose = require("mongoose");

// user schema
const ListingSchema = new mongoose.Schema({

    // Name field
    title:{
        type: String,
        required : [true, "Please provide a name"],
        unique : false,
    },
    // Product Category
    category:{
        type: String,
        required : [true, "Please Provide a category"],
        unique: false,
    },
    // Product Description format
    description:{
        type: String,
        required : [true, "Please provde a description"],
        unique : false,
    },
    // Product listed by
    username:{
        type: String,
        required : [true, "Error : Username not provided"],
        unique: false,
    },
    // Product listed by (name)
    name:{
        type: String,
        required : [true, "Error : Full Name not provided"],
        unique: false,
    },
    // Product expected price
    expectedPrice:{
        type: String,
        required : [true, "Please provide a expected price"],
        unique: false,
    },
    // Age of prodcut -> how old?
    productAge:{
        type: String,
        required : [true, "Please provide product age"],
        unique: false,
    },
    // product image
    prodcutImg:{
        type: String,
        required: [true, "please provide product image"],
        unique: false
    },
    added : {
        type: String,
        required: [true, "Date not added"],
        unique: false
    }

},{ timestamps: true });

// export UserSchema
module.exports = mongoose.model.Listings || mongoose.model("Listings", ListingSchema);
