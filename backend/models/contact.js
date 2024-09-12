const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  mobile_number: String,
});

module.exports = mongoose.model('Contact', ContactSchema);
