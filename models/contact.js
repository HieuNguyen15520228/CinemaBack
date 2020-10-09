const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment')
const contactSchema = new Schema({
  email:{
    type: String
  },
  name:{
    type: String
  },
  message:{
      type: String
  },
  contactDate: { 
      type: Date, default: moment().format() 
    },
});


module.exports = mongoose.model('Contact', contactSchema)