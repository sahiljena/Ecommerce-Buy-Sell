const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({

  // Name field
  name:{
    type: String,
    required : [true, "Please provide a name"],
    unique : false,
  },

  // email field
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email exist"],
  },

  //   password field
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },

});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
