const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    username:{
      type:String,
      required:true,
      min:3, 
      max:20, 
      unique:true
    },
    password:{
      type:String,
      required:true,
      min:8
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    name: {
      type: String,
    },
    age: {
      type: String,
    }
  })

  module.exports = mongoose.model('User', userSchema);